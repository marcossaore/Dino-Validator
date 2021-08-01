import { RegexParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class RegexFieldValidation implements Validation {
  constructor (
    private readonly paramName: string,
    private readonly regex: RegExp,
    private readonly message: string
  ) {}

  public validate (input: any): Error {
    if (!this.regex.test(input[this.paramName])) {
      return new RegexParamError(this.message)
    }
  }
}
