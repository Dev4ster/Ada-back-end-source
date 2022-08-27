type InitType = (test?: string) => string

export const testFunc: InitType = (test) => {
  return 1 + test
}
