import { MinLenghtParamError, MinMaxLenghtParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols/validation'

export class LengthFieldValidation implements Validation {
  constructor (
    private readonly paramName: string,
    private readonly minLength: number,
    private readonly maxLength: number = null
  ) {}

  public validate (input: any): Error {
    if (this.maxLength) {
      if (input[this.paramName].length < this.minLength || input[this.paramName].length > this.maxLength) {
        return new MinMaxLenghtParamError(this.paramName, this.minLength, this.maxLength)
      }
    }

    if (input[this.paramName].length < this.minLength) {
      return new MinLenghtParamError(this.paramName, this.minLength)
    }
  }
}
