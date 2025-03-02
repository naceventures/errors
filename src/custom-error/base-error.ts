import cleanStack from 'clean-stack'
import type { WithCause, WithMessage } from './types'
import { setErrorPrototype } from './utils'

/**
 * Base App Error
 * Custom classes should extends this class
 *
 * @param code
 * @param details
 * @param context
 *
 * ! AppError should be extended, not instanciated directly
 */
class AppError<TCode, TDetails, TContext> extends Error {
   public readonly code: TCode
   public readonly details: TDetails
   public readonly context: TContext

   constructor(code: TCode, details: WithMessage<TDetails>, context?: WithCause<TContext>) {
      const { message, ...otherDetails } = details
      const { cause, ...otherContext } = context ?? {}

      super(message)

      this.name = this.constructor.name
      this.code = code
      this.message = message
      this.details = { message, ...otherDetails } as WithMessage<TDetails>
      this.context = { ...otherContext } as TContext
      this.cause = cause
      this.stack = cleanStack(new Error().stack, { pretty: true })

      // Set the prototype explicitly
      setErrorPrototype(this, new.target)
   }

   toJSON() {
      return {
         type: this.name,
         code: this.code,
         message: this.message,
         details: this.details,
         context: this.context,
         cause: this.cause,
         stack: this.stack,
      }
   }
}

export { AppError }
