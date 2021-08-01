export class RegexParamError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'RegexParamError'
  }
}
