import { MinLenghtParamError, MinMaxLenghtParamError } from '@/presentation/errors'
import { LengthFieldValidation } from '@/validation/validators/'

const makeSut = (paramName: string, minLength: number, maxLength: number = null): LengthFieldValidation => {
  return new LengthFieldValidation(paramName, minLength, maxLength)
}

describe('Length field Validation', () => {
  test('should return a MinLenghtParamError when lenght is lesser than expected', () => {
    const data = {
      paramName: 'test'
    }
    const sut = makeSut('paramName', 5)
    const error = sut.validate(data)
    expect(error).toEqual(new MinLenghtParamError('paramName', 5))
  })

  test('should return a MinMaxLenghtParamError when lenght is lesser than min lenght param', () => {
    const data = {
      paramName: 'ok'
    }
    const sut = makeSut('paramName', 3, 5)
    const error = sut.validate(data)
    expect(error).toEqual(new MinMaxLenghtParamError('paramName', 3, 5))
  })

  test('should return a MinMaxLenghtParamError when lenght is greater than max lenght param', () => {
    const data = {
      paramName: 'testing'
    }
    const sut = makeSut('paramName', 3, 6)
    const error = sut.validate(data)
    expect(error).toEqual(new MinMaxLenghtParamError('paramName', 3, 6))
  })

  test('should not return when min lenght is the expected', () => {
    const data = {
      paramName: 'test'
    }
    const sut = makeSut('paramName', 4)
    const error = sut.validate(data)
    expect(error).toBeFalsy()
  })

  test('should not return when param will be between min and max lenght expected', () => {
    const data = {
      paramName: 'test'
    }
    const sut = makeSut('paramName', 4, 6)
    const error = sut.validate(data)
    expect(error).toBeFalsy()
  })
})
