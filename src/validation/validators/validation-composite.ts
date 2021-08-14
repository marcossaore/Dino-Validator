import { Validation } from '../../presentation/protocols/validation'

export class ValidationComposite {
  private readonly validations: Validation[]

  constructor (validators) {
    this.validations = validators
  }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
