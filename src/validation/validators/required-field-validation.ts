import { Validation } from '../../presentation/protocols/validation'
import { MissingParamError } from '../../presentation/errors'

export class RequiredFieldValidation implements Validation {
  private readonly field: string

  constructor (field: string) {
    this.field = field
  }

  validate (input: any): Error {
    if (!input[this.field]) {
      return new MissingParamError(this.field)
    }
  }
}
