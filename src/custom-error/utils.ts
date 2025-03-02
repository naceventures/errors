import { validateErrorName } from './validation'
import type { AnyErrorClass } from './types'

export const isObject = (value: unknown) => typeof value === 'object' && value !== null

// ========== Error name ==========

/**
 * Sets the name to error classes created anonymously
 * i.e. when created with `const Class = class { }`
 *
 * - The constructor `name` must be set
 * - `error.name` must also be assigned on the prototype, not on the instance
 *
 * @param ErrorClass
 * @param name
 */
function setErrorName(ErrorClass: AnyErrorClass, name: string): void {
   validateErrorName(name)
   setObjectProperty(ErrorClass, 'name', name)
   setObjectProperty(ErrorClass.prototype, 'name', name)
}

/**
 * Helper to set a property to an object
 *
 * @param object
 * @param propName
 * @param value
 */
function setObjectProperty<T extends object, K extends keyof T>(
   object: T,
   propName: K,
   value: T[K],
): void {
   Object.defineProperty(object, propName, {
      value,
      writable: true,
      enumerable: false,
      configurable: true,
   })
}

// ========== Prototype ==========

/**
 * Re-setting the prototype so that `instanceof` or `constructor` checks don't fail.
 * That way, subclasses prototype are inherited
 *
 * @param error
 * @param newTarget
 */
function setErrorPrototype(error: Error, newTarget: AnyErrorClass): void {
   // Validate the error
   if (!(error instanceof Error)) {
      throw new TypeError(`First argument must be an error instance: ${error}`)
   }

   // Validate the new target
   if (newTarget === undefined) {
      throw new TypeError(
         "`ensureCorrectClass` must be called directly inside the class's constructor",
      )
   }

   if (typeof newTarget !== 'function' || !isObject(newTarget.prototype)) {
      throw new TypeError('Second argument must be `new.target`')
   }

   const newTargetProto = newTarget.prototype

   // Set the prototype
   if (Object.getPrototypeOf(error) !== newTargetProto) {
      Object.setPrototypeOf(error, newTargetProto)
   }

   if (
      typeof newTargetProto.constructor === 'function' &&
      error.constructor !== newTargetProto.constructor
   ) {
      // @ts-expect-error: The operand of a 'delete' operator must be optional.
      delete error.constructor
   }
}

export { setErrorName, setErrorPrototype }
