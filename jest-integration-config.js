/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./jest.config')
config.testMatch = ['**/*.test*.{js,ts}']
module.exports = config
