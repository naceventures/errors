import type { ErrorMap } from './types'
import { AppError } from './base-error'
import { createErrorClassFromMap } from './custom-error'
import { fromHttpCode, fromHttpStatus, fromHttpMessage } from './http-errors'

export type { ErrorMap }
export { AppError, createErrorClassFromMap, fromHttpCode, fromHttpStatus, fromHttpMessage }
