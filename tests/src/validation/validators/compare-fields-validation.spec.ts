import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/validation/validators/'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('pass', 'passConf')
}

describe('Compare Fields Validation', () => {
  test('should return an invalid param error if values has diff values', () => {
    const sut = makeSut()
    const data = {
      pass: 123,
      passConf: 1234
    }
    const error = sut.validate(data)
    expect(error).toEqual(new InvalidParamError('pass'))
  })

  test('should not return when arguments are the same', () => {
    const sut = makeSut()
    const data = {
      pass: '1234',
      passConf: '1234'
    }
    const error = sut.validate(data)
    expect(error).toBeFalsy()
  })
})
