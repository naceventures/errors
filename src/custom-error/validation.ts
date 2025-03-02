// ========== Constants ==========

const ERROR_NAME_END = 'Error'
const ERROR_NAME_REGEXP = /[A-Z][a-zA-Z]*Error$/u

// ========== Error name validation utils ==========

/**
 * Error name should look like `ExampleError` for consistency with
 * native error classes and common practices.
 *
 * @param name
 */
const validateErrorName = (errorName: string) => {
   if (typeof errorName !== 'string') {
      throw new TypeError(`Error name must be a string: ${errorName}`)
   }

   validateNativeErrors(errorName)

   if (!errorName.endsWith(ERROR_NAME_END) || errorName === ERROR_NAME_END) {
      throw new Error(`Error name "${errorName}" must end with "${ERROR_NAME_END}"`)
   }

   validateErrorNamePattern(errorName)
}

const NATIVE_ERRORS = new Set([
   // JavaScript core errors
   'Error',
   'ReferenceError',
   'TypeError',
   'SyntaxError',
   'RangeError',
   'URIError',
   'EvalError',
   'AggregateError',

   // Node.js specific
   'SystemError',
   'AssertionError',
   'Warning',
   'UnhandledPromiseRejection',

   // DOM specific
   'DOMException',
])

const validateNativeErrors = (errorName: string) => {
   if (NATIVE_ERRORS.has(errorName)) {
      throw new Error(`Error name "${errorName}" must not be a native class`)
   }
}

const validateErrorNamePattern = (errorName: string) => {
   if (errorName[0] !== errorName.toUpperCase()[0]) {
      throw new Error(`Error name "${errorName}" must start with an uppercase letter.`)
   }

   if (!ERROR_NAME_REGEXP.test(errorName)) {
      throw new Error(`Error name "${errorName}" must only contain letters.`)
   }
}

export { validateErrorName }
