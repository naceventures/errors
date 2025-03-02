import type { ErrorMap } from './custom-error'
import { AppError, createErrorClassFromMap } from './custom-error'
import { fromHttpCode, fromHttpStatus, fromHttpMessage } from './custom-error'
import { trycatch } from './trycatch/trycatch'

export type { ErrorMap }
export { AppError, createErrorClassFromMap }
export { fromHttpCode, fromHttpStatus, fromHttpMessage }
export { trycatch }
