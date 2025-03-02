/**
 * https://github.com/ts-zen/trycatch
 */

// ========== Types ===========

/**
 * Represents a successful result in a {@link TryCatch} tuple.
 *
 * @type R - The type of the successful result.
 */
type Ok<T> = [err: null, res: T]

/**
 * Represents a failed result in a {@link TryCatch} tuple.
 */
type Err = [err: ThrownError, res: unknown]

/**
 * Represents the result of a try-catch operation, which can either be
 * a success ({@link Ok}) or a failure ({@link Err}).
 *
 * @type R - The type of the successful result.
 */
type TryCatch<T> = Ok<T> | Err

// ========== Result ===========

/**
 * Creates a successful {@link Ok} tuple.
 *
 * @param {R} res The successful result value.
 * @returns {Ok<R>} The {@link Ok} tuple containing the result.
 */
const Ok = <T>(res: T): Ok<T> => [null, res]

/**
 * Creates a failed {@link Err} tuple.
 *
 * @param {unknown} thrown The thrown error to wrap in a {@link ThrownError}.
 * @returns {Err} The {@link Err} tuple containing the error.
 */
const Err = (thrown: unknown): Err => [new ThrownError(thrown), null]

// ========== TryCatch ===========

/**
 * Executes a task and returns its result wrapped in a {@link TryCatch} tuple.
 *
 * @type T - The type of the successful result.
 * @param {() => never} task A task that never completes successfully.
 * @returns {TryCatch<never>} A {@link TryCatch} tuple representing the result.
 */
function trycatch(task: () => never): TryCatch<never>

/**
 * Executes an asynchronous task and returns a promise that resolves to
 * its result wrapped in a {@link TryCatch} tuple.
 *
 * @type T - The type of the successful result.
 * @param {() => Promise<T>} task An asynchronous task to execute.
 * @returns {Promise<TryCatch<T>>} A Promise of a {@link TryCatch} tuple representing the result.
 */
function trycatch<T>(task: () => Promise<T>): Promise<TryCatch<T>>

/**
 * Executes a synchronous task and returns its result wrapped in a {@link TryCatch} tuple.
 *
 * @type T - The type of the successful result.
 * @param {() => T} task A synchronous task to execute.
 * @returns {TryCatch<T>} A {@link TryCatch} tuple representing the result.
 */
function trycatch<T>(task: () => T): TryCatch<T>

/**
 * Executes a Promise and returns its result wrapped in a {@link TryCatch} tuple.
 *
 * @type T - The type of the successful result.
 * @param {Promise<T>} task A Promise to resolve.
 * @returns {Promise<TryCatch<T>>} A Promise of a {@link TryCatch} tuple representing the result.
 */
function trycatch<T>(task: Promise<T>): Promise<TryCatch<T>>

/**
 * Executes a synchronous or asynchronous task or Promise and returns its result
 * wrapped in a {@link TryCatch} tuple.
 *
 * @type T - The type of the successful result.
 * @param {(() => T) | Promise<T> | (() => Promise<T>)} task The task or Promise to execute.
 * @returns {Promise<TryCatch<T>> | TryCatch<T>} A {@link TryCatch} tuple or a Promise of
 * a {@link TryCatch} tuple representing the result.
 */
function trycatch<T>(
   task: (() => T) | Promise<T> | (() => Promise<T>),
): Promise<TryCatch<T>> | TryCatch<T> {
   if (task instanceof Promise) {
      // Generate a promise that resolves to the TryCatch tuple.
      return task.then((v) => Ok(v)).catch((e) => Err(e))
   }

   try {
      // Execute the task and get its result.
      const maybePromiseResult = task()

      if (maybePromiseResult instanceof Promise) {
         // Generate a promise that resolves to the result of the task.
         return maybePromiseResult.then((v) => Ok(v)).catch((e) => Err(e))
      }

      return Ok(maybePromiseResult)
   } catch (thrown) {
      return Err(thrown)
   }
}

// ========== Error ===========

/**
 * Represents an error that was thrown during execution and wraps the original cause.
 */
class ThrownError extends Error {
   /**
    * Creates an instance of {@link ThrownError}.
    *
    * @param {unknown} cause The original error or cause of the exception.
    */
   public constructor(cause: unknown) {
      super('thrown error', { cause })
      // Manually set the cause as a property for backward compatibility.
      this.cause = cause
      // Capture the stack trace.
      // if (Error.captureStackTrace) Error.captureStackTrace(this, ThrownError)
      this.stack = new Error().stack
   }
}

export { trycatch }
