import { Dino } from '@/main/dino-validator-factory'
import { DinoValidationModel } from '@/main/dino-validator-type'

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

let buildSpy
let validateSpy

describe('Dino Validator Factory', () => {
  beforeEach(() => {
    buildSpy = jest.spyOn(Dino, 'build')
    validateSpy = jest.spyOn(Dino, 'validate')
  })

  test('should call Dino.build with correct params', () => {
    Dino.build(dinoModel)
    expect(buildSpy).toHaveBeenCalledWith(dinoModel)
  })

  test('should call Dino.validate with correct params', () => {
    Dino.validate(input)
    expect(validateSpy).toHaveBeenCalledWith(input)
  })

  test('should return when receives an error', () => {
    jest.restoreAllMocks()
    const error = Dino.build(dinoModel).validate({})
    expect(error).toBeInstanceOf(Error)
  })

  test('should not return when succeds', () => {
    jest.restoreAllMocks()
    const error = Dino.build(dinoModel).validate(input)
    expect(error).toBeFalsy()
  })
})
