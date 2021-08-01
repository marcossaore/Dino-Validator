export class MinMaxLenghtParamError extends Error {
  constructor (paramName: string, minLength: number, maxLength: number) {
    super(`param: ${paramName} must be between ${minLength} and ${maxLength} characters long`)
    this.name = 'MinMaxLenghtError'
  }
}
