import { TypeParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { TypeFieldValidation } from '@/validation/validators'

const makeSut = (paramName: string, typeExpected: any): Validation => {
  return new TypeFieldValidation(paramName, typeExpected)
}

const data = {
  age: '27'
}

describe('Type Field Validation', () => {
  test('should return a type param error if argument passed doesnt have same type provided', () => {
    const sut = makeSut('age', 'number')
    const error = sut.validate(data)
    expect(error).toEqual(new TypeParamError('age', 'number'))
  })

  test('should not return when param and type matched', () => {
    const sut = makeSut('age', 'string')
    const error = sut.validate(data)
    expect(error).toBeFalsy()
  })
})
