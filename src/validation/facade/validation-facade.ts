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
        this.addCustomMessage(paramName, paramProperties.requiredMessage)
      }

      const inputValue = input[paramName] || null

      if (!inputValue) {
        continue
      }

      const { type, minLength, maxLength, minMaxLengthMessage, match, matchMessage } = paramProperties

      if (type) {
        this.validations.push(new TypeFieldValidation(paramName, type))
      }

      if (minLength) {
        this.validations.push(new LengthFieldValidation(paramName, minLength, maxLength))
        this.addCustomMessage(paramName, minMaxLengthMessage)
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
      return this.getErrorFromCustomMessages(error) || error
    }
  }

  private addCustomMessage (paramName: string, messageError: string): void {
    if (!messageError) {
      return
    }

    this.customMessages.push({
      paramName,
      genericMessageError: new GenericMessageError(messageError)
    })
  }

  private getErrorFromCustomMessages (error): Error {
    if (this.customMessages.length > 0) {
      for (const customMessage of this.customMessages) {
        if (error.message.search(customMessage.paramName)) {
          return customMessage.genericMessageError
        }
      }
    }
  }
}
