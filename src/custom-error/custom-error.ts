import type { AnyDict, ErrorName, ErrorMap, CustomErrorClass, WithCause, WithMessage } from './types'
import { AppError } from './base-error'
import { setErrorName } from './utils'

/**
 * Create an error class given a name and an error map
 *
 * @param name
 * @param errorMap
 * @returns
 */
function createErrorClassFromMap<
   TMap extends ErrorMap<TDetails>,
   TDetails extends AnyDict = AnyDict,
   TContext extends AnyDict = AnyDict,
>(name: ErrorName, errorMap: TMap): CustomErrorClass<keyof TMap, TDetails, TContext> {
   type Code = keyof TMap

   const CustomClass = class extends AppError<Code, TDetails, TContext> {
      constructor(code: Code, context?: WithCause<TContext>) {
         // Extract error context
         const details = errorMap[code] as WithMessage<TDetails>
         super(code, details, context)
      }
   }

   setErrorName(CustomClass, name)

   return CustomClass
}

export { createErrorClassFromMap }
