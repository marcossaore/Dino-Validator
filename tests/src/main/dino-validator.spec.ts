import { OdinValidator } from '@/main/odin-validator'
import { OdinValidationModel } from '@/main/odin-validator-type'
import { ValidationFacade } from '@/validation/facade/validation-facade'

const makeSut = (odinValidationModel: OdinValidationModel): OdinValidator => {
  return new OdinValidator(odinValidationModel)
}

jest.mock('@/validation/facade/validation-facade')

const odinModel: OdinValidationModel = {
  name: {
    required: true,
    type: 'string',
    minLength: 3,
    maxLength: 6
  }
}

const input = {
  name: 'Odin'
}

describe('Odin Validator Factory', () => {
  test('should call ValidationFacade with expected odin model', () => {
    const sut = makeSut(odinModel)
    sut.validate(input)
    expect(ValidationFacade).toHaveBeenCalledWith(odinModel)
  })

  test('should call ValidationFacade with expected odin model', () => {
    const sut = makeSut(odinModel)
    const validationFacadeInstance = ValidationFacade as jest.Mock<ValidationFacade>
    const validateSpy = validationFacadeInstance.mock.instances[0].validate
    sut.validate(input)
    expect(validateSpy).toHaveBeenCalledWith(input)
  })
})
