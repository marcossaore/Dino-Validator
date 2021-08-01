export class MinLenghtParamError extends Error {
  constructor (paramName: string, lenght: number) {
    super(`param: ${paramName} must be ${lenght} characters long`)
    this.name = 'MinLenghtError'
  }
}
