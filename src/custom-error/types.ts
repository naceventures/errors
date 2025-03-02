import { AppError } from './base-error'

type ErrorName = `${string}Error`
type ErrorMap<T extends AnyDict> = Record<string, WithMessage<T>>

type AnyDict = Record<string, any>
type WithCause<T> = T & { cause?: Error }
type WithMessage<T> = T & { message: string }

interface AnyErrorClass {
   new (...args: any[]): Error
   name: string
}

interface CustomErrorClass<TCode, TContext, TDetails> {
   new (code: TCode, details?: WithCause<TDetails>): AppError<TCode, TContext, TDetails>
}

export type {
   AnyDict,
   AnyErrorClass,
   CustomErrorClass,
   ErrorMap,
   ErrorName,
   WithCause,
   WithMessage
}
