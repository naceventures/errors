# @naceventures/errors

Error utilities to create fully typed custom error classes.

## Installation

```bash
pnpm add @naceventures/errors
```

## Custom Error class

### Usage

The library allows you to create strongly typed errors classes in 3 steps:

1. Creating an error map
2. Creating custom error classes using the error map
3. Using the error instance
 
### Create your error map
 
The first step is to define your error details and pass it to the ErrorMap type.
 
```ts
import { ErrorMap } from '@naceventures/errors'
 
interface AuthDetails {
   status: number
   message_fr: string
}
 
const authMap = {
   invalid_credentials: {
      status: fromHttpCode('401_unauthorized').status,
      message: 'The provided credentials are invalid.',
      message_fr: 'The provided credentials are invalid.',
   },
   user_already_exists: {
      status: fromHttpCode('409_conflict').status,
      message: 'An account with this email already exists.',
      message_fr: 'An account with this email already exists.',
   },
   session_expired: {
      status: fromHttpCode('401_unauthorized').status,
      message: 'The session has expired.',
      message_fr: 'The session has expired.',
   },
   account_locked: {
      status: fromHttpCode('403_forbidden').status,
      message: 'The account has been locked due to multiple failed login attempts.',
      message_fr: 'The account has been locked due to multiple failed login attempts.',
   },
} as const satisfies ErrorMap<AuthDetails>
```

`ErrorMap` automatically adds a `message: string` to the details as it is required in all cases.

In order to strongly type your error map you need to type your map with `as const`  to get IntelliSense for your error codes.

Also, adding `satisfies ErrorMap<YourDetails>` enforces your map structure.

### Create your error custom class

The second step is to create your custom error class

```ts
import { createErrorFromMap } from '@naceventures/errors'

interface AuthDetails {
   status: number
   message_fr: string
}

interface AuthContext {
   userId?: string
   path?: string
}

const authMap = {
   // error map
} as const satisfies ErrorMap<AuthDetails>

const AuthError = createErrorFromMap<typeof authMap, AuthDetails, AuthContext>('AuthError', authMap)
```

`createErrorFromMap` has the following signature. It takes 3 types and 2 arguments

```ts
createErrorFromMap<TMap, TDetails, TContext>(name: string, errorMap: TMap)
```

Types:
- `TMap` - The type of the erorr map. Pass the type of the instance with `typeof errorMap`
- `TDetails` - The error details interface used to create the error map. default: `Record<string, any>`
- `TContext` - The context interface you want your custom class to be aware of. default: `Record<string, any>`

Arguments:
- The error name
- The error map

```ts
const AuthError = createErrorFromMap<AuthDetails, AuthContext>('AuthError', authMap)

// Usage
throw new AuthError('invalid_credentials')
// or
throw new AuthError('invalid_credentials', { userId: '0123456789' })
```

### Use the error instance

The third and last step is to consume your error instance

```ts
interface AppError {
   name: string,
   code: string,
   message: string
   details: Record<string, any> & { message: string }
   context: Record<string, any>
   cause?: Error
   stack?: string
}
```

### Helpers

```ts
import { fromHttpCode, fromHttpStatus, fromHttpMessage } from '@naceventures/errors'
```

#### fromHttpCode

```ts
fromHttpCode('401_unauthorized')
// => { code: '401_unauthorized', status: 401, message: 'unauthorized' }
```

#### fromHttpStatus

```ts
fromHttpCode(404)
// => { code: '404_not_found', status: 404, message: 'not_found' }
```

#### fromHttpMessage

```ts
fromHttpMessage('locked')
// => { code: '423_locked', status: 423, message: 'locked' }
```

## trycatch

### Usage

```ts
import { trycatch } from '@naceventures/errors'

const [error, data] = trycatch(() => synchronousFunction())

if (error) {
   throw new CustomError(...)
}

// Continue with data
```

### Wrap your throwable functions in `trycatch()`

```ts
// Wrap synchronous function
const [error, data] = trycatch(() => synchronousFunction())

// Wrap asynchronous function
const [error, data] = await trycatch(() => asynchronousFunction())

// Wrap promise
const [error, data] = await trycatch(promise)
```

# Inspiration

Inspired from
- [modern-errors](https://github.com/ehmicky/modern-errors)
- [trycatch](https://github.com/ts-zen/trycatch)
