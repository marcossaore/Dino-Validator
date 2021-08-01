import { TypeParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

type AllowedTypes = 'string' | 'number' | 'boolean' | 'array' | 'object'

export class TypeFieldValidation implements Validation {
  constructor (
    private readonly paramName: string,
    private readonly typeExpected: AllowedTypes
  ) {}

  validate (input: any): Error {
    // eslint-disable-next-line valid-typeof
    if (typeof input[this.paramName] !== this.typeExpected) {
      return new TypeParamError(this.paramName, this.typeExpected)
    }
  }
}
