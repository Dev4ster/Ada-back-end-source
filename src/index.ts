type InitType = (test?: string) => string

export const testFunc: InitType = (test) => {
  return 'oi' + test
}
