import { MinLenghtParamError, MinMaxLenghtParamError, MissingParamError, RegexParamError, TypeParamError } from '@/presentation/errors'
import { ValidationFacade } from '@/validation/facade/validation-facade'
import { ValidationModel } from '@/validation/facade/validation-facade-types'

const makeSut = (validationModel: ValidationModel): ValidationFacade => {
  const sut = new ValidationFacade(validationModel)
  return sut
}

describe('Validation Facade', () => {
  test('should return a MissingParamError if param is required but it not provided', () => {
    const validationModel: ValidationModel = {
      age: {
        type: 'number',
        required: true
      }
    }
    const sut = makeSut(validationModel)
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('age'))
  })

  test('should return a RequiredCustomMessage if requiredMessage is provided', () => {
    const validationModel: ValidationModel = {
      age: {
        type: 'number',
        required: true,
        requiredMessage: 'Age is required'
      }
    }
    const sut = makeSut(validationModel)
    const error = sut.validate({})
    expect(error).toEqual(new Error('Age is required'))
  })

  test('should not return any error if there is not modelValidation', () => {
    const sut = makeSut({})
    const error = sut.validate({ age: 27 })
    expect(error).toBeFalsy()
  })

  test('should return a TypeErrorParam if type is different', () => {
    const validationModel: ValidationModel = {
      age: {
        type: 'number',
        required: true
      }
    }
    const data = {
      age: 'foo'
    }
    const sut = makeSut(validationModel)
    const error = sut.validate(data)
    expect(error).toEqual(new TypeParamError('age', 'number'))
  })

  test('should not return a TypeErrorParam if param is not required and not provided but it has type definition', () => {
    const sut = makeSut({
      age: {
        type: 'number'
      }
    })
    const error = sut.validate({})
    expect(error).toBeFalsy()
  })

  test('should return a TypeErrorParam if param is not required, but it was provided and has type definition', () => {
    const sut = makeSut({
      age: {
        type: 'number'
      }
    })
    const error = sut.validate({
      age: 'foo'
    })
    expect(error).toEqual(new TypeParamError('age', 'number'))
  })

  test('should return a MinLenghtParamError if param is less than expected', () => {
    const sut = makeSut({
      password: {
        type: 'string',
        minLength: 6
      }
    })
    const error = sut.validate({
      password: '123'
    })
    expect(error).toEqual(new MinLenghtParamError('password', 6))
  })

  test('should return a MinMaxLenghtParamError if param is less than expected', () => {
    const sut = makeSut({
      password: {
        type: 'string',
        minLength: 3,
        maxLength: 6
      }
    })
    const error = sut.validate({
      password: '12'
    })
    expect(error).toEqual(new MinMaxLenghtParamError('password', 3, 6))
  })

  test('should return a MinMaxLenghtParamError if param is greather than expected', () => {
    const sut = makeSut({
      password: {
        type: 'string',
        minLength: 3,
        maxLength: 6
      }
    })
    const error = sut.validate({
      password: '12345678'
    })
    expect(error).toEqual(new MinMaxLenghtParamError('password', 3, 6))
  })

  test('should not return a MinLenghtParamError if param is not provided when it is not required', () => {
    const sut = makeSut({
      password: {
        type: 'string',
        minLength: 6
      }
    })
    const error = sut.validate({})
    expect(error).toBeFalsy()
  })

  test('should throw if matchMessage is no provided', () => {
    const sut = makeSut({
      alphanumeric: {
        type: 'string',
        match: /42i/
      }
    })
    try {
      sut.validate({
        alphanumeric: '42i'
      })
    } catch (error) {
      expect(error.message).toBe('matchMessage must be provided!')
    }
  })

  test('should return a MinMaxLenghtCustomMessage if minMaxLengthMessage is provided', () => {
    const validationModel: ValidationModel = {
      password: {
        type: 'string',
        required: true,
        minLength: 6,
        minMaxLengthMessage: 'Password is too short'
      }
    }
    const sut = makeSut(validationModel)
    const error = sut.validate({
      password: '123'
    })
    expect(error).toEqual(new Error(validationModel.password.minMaxLengthMessage))
  })

  test('should return a RegexParamError if param does not match', () => {
    const validationModel: ValidationModel = {
      alphanumeric: {
        type: 'string',
        match: /42i/,
        matchMessage: 'The Alphanumeric must have "42i"'
      }
    }
    const sut = makeSut(validationModel)
    const error = sut.validate({
      alphanumeric: '68opsy'
    })
    expect(error).toEqual(new RegexParamError(validationModel.alphanumeric.matchMessage))
  })

  test('should not return a RegexParamError if param is not provided and not required', () => {
    const validationModel: ValidationModel = {
      alphanumeric: {
        type: 'string',
        match: /42i/,
        matchMessage: 'The Alphanumeric must have "42i"'
      }
    }
    const sut = makeSut(validationModel)
    const error = sut.validate({})
    expect(error).toBeFalsy()
  })
})
