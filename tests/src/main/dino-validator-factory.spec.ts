import { Odin } from '@/main/odin-validator-factory'
import { OdinValidationModel } from '@/main/odin-validator-type'

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

let buildSpy
let validateSpy

describe('Odin Validator Factory', () => {
  beforeEach(() => {
    buildSpy = jest.spyOn(Odin, 'build')
    validateSpy = jest.spyOn(Odin, 'validate')
  })

  test('should call Odin.build with correct params', () => {
    Odin.build(odinModel)
    expect(buildSpy).toHaveBeenCalledWith(odinModel)
  })

  test('should call Odin.validate with correct params', () => {
    Odin.validate(input)
    expect(validateSpy).toHaveBeenCalledWith(input)
  })

  test('should return when receives an error', () => {
    jest.restoreAllMocks()
    const error = Odin.build(odinModel).validate({})
    expect(error).toBeInstanceOf(Error)
  })

  test('should not return when succeds', () => {
    jest.restoreAllMocks()
    const error = Odin.build(odinModel).validate(input)
    expect(error).toBeFalsy()
  })
})
