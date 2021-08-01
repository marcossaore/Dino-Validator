import { DinoValidator } from '@/main/dino-validator'
import { DinoValidationModel } from '@/main/dino-validator-type'
import { ValidationFacade } from '@/validation/facade/validation-facade'

const makeSut = (dinoValidationModel: DinoValidationModel): DinoValidator => {
  return new DinoValidator(dinoValidationModel)
}

jest.mock('@/validation/facade/validation-facade')

const dinoModel: DinoValidationModel = {
  name: {
    required: true,
    type: 'string',
    minLength: 3,
    maxLength: 6
  }
}

const input = {
  name: 'Dino'
}

describe('Dino Validator Factory', () => {
  test('should call ValidationFacade with expected dino model', () => {
    const sut = makeSut(dinoModel)
    sut.validate(input)
    expect(ValidationFacade).toHaveBeenCalledWith(dinoModel)
  })

  test('should call ValidationFacade with expected dino model', () => {
    const sut = makeSut(dinoModel)
    const validationFacadeInstance = ValidationFacade as jest.Mock<ValidationFacade>
    const validateSpy = validationFacadeInstance.mock.instances[0].validate
    sut.validate(input)
    expect(validateSpy).toHaveBeenCalledWith(input)
  })
})
