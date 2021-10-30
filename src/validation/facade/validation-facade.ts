import { Validation } from '../../presentation/protocols/validation'
import { LengthFieldValidation } from '../validators/length-field-validation'
import { RegexFieldValidation } from '../validators/regex-field-validation'
import { RequiredFieldValidation } from '../validators/required-field-validation'
import { TypeFieldValidation } from '../validators/type-field-validation'
import { ValidationComposite } from '../validators/validation-composite'
import { ValidationModel } from './validation-facade-types'

class GenericMessageError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'GenericMessageError'
  }
}

type CustomMessage = {
  paramName: string
  genericMessageError: GenericMessageError
}

export class ValidationFacade implements Validation {
  private readonly validations: Validation[] = []
  private readonly customMessages: CustomMessage[] = []

  constructor (private readonly validationModel: ValidationModel) {}

  validate (input: any): Error {
    for (const [paramName, paramProperties] of Object.entries(this.validationModel)) {
      if (paramProperties.required) {
        this.validations.push(new RequiredFieldValidation(paramName))
        if (paramProperties.requiredMessage) {
          this.addCustomMessage(paramName, paramProperties.requiredMessage)
        }
      }

      const inputValue = input[paramName] || null

      if (!inputValue) {
        continue
      }

      const { type, minLength, maxLength, minMaxLengthMessage, match, matchMessage } = paramProperties

      this.validations.push(new TypeFieldValidation(paramName, type))

      if (minLength) {
        this.validations.push(new LengthFieldValidation(paramName, minLength, maxLength))
        if (minMaxLengthMessage) {
          this.addCustomMessage(paramName, minMaxLengthMessage)
        }
      }

      if (match) {
        if (!matchMessage) {
          throw new Error('matchMessage must be provided!')
        }
        this.validations.push(new RegexFieldValidation(paramName, match, matchMessage))
      }
    }

    const error = new ValidationComposite(this.validations).validate(input)

    if (error) {
      return this.getErrorFromCustomMessages() || error
    }
  }

  private addCustomMessage (paramName: string, messageError: string): void {
    this.customMessages.push({
      paramName,
      genericMessageError: new GenericMessageError(messageError)
    })
  }

  private getErrorFromCustomMessages (): Error {
    if (this.customMessages.length > 0) {
      return this.customMessages[0].genericMessageError
    }
  }
}
