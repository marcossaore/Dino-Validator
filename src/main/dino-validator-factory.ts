import { DinoValidator } from './dino-validator'
import { DinoValidationModel } from './dino-validator-type'

export const Dino = {
  validator: null as DinoValidationModel,

  build (dinoValidationModel: DinoValidationModel) {
    this.validator = new DinoValidator(dinoValidationModel)
    return Dino
  },

  validate (input: any): Error {
    return this.validator.validate(input)
  }
}
