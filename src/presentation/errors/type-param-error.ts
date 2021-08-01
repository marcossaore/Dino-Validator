export class TypeParamError extends Error {
  constructor (paramName: string, typeExpected: string) {
    super(`Type param: ${paramName} should be: ${typeExpected}`)
    this.name = 'TypeParamError'
  }
}
