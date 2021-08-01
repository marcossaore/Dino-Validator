import { RegexParamError } from '@/presentation/errors'
import { RegexFieldValidation } from '@/validation/validators'

const makeSut = (paramName: string, regex: RegExp, message: string): RegexFieldValidation => {
  return new RegexFieldValidation(paramName, regex, message)
}

describe('Regex Field Validation', () => {
  test('should return a RegexParamError if regex do not match with param', () => {
    const data = {
      paramName: 'tsting'
    }
    const sut = makeSut('paramName', /test/, 'param: paramName must contains "test"')
    const error = sut.validate(data)
    expect(error).toEqual(new RegexParamError('param: paramName must contains "test"'))
  })

  test('should not return if regex match with param', () => {
    const data = {
      paramName: 'testing'
    }
    const sut = makeSut('paramName', /test/, 'param: paramName must contains "test"')
    const error = sut.validate(data)
    expect(error).toBeFalsy()
  })
})
