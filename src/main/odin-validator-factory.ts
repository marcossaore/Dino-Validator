import { OdinValidator } from './odin-validator'
import { OdinValidationModel } from './odin-validator-type'

export const Odin = {
  validator: null as OdinValidationModel,

  build (odinValidationModel: OdinValidationModel) {
    this.validator = new OdinValidator(odinValidationModel)
    return Odin
  },

  validate (input: any): Error {
    return this.validator.validate(input)
  }
}
