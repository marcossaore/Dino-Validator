import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import faker from 'faker'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('name')
}

describe('Required Field Validation', () => {
  test('should return a missing param error if argument required is not provided', () => {
    const sut = makeSut()
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('name'))
  })

  test('should not return when argument required field is provided', () => {
    const sut = makeSut()
    const error = sut.validate({ name: faker.name })
    expect(error).toBeFalsy()
  })
})
