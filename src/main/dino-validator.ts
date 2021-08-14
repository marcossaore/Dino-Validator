import { Validation } from '../presentation/protocols/validation'
import { ValidationFacade } from '../validation/facade/validation-facade'
import { ValidationModel } from '../validation/facade/validation-facade-types'

export class DinoValidator implements Validation {
  constructor (private readonly validationModel: ValidationModel) {}

  validate (input: any): Error {
    return (new ValidationFacade(this.validationModel)).validate(input)
  }
}
