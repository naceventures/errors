// ========== Map ==========

const HTTP_STATUS_CODES = {
   400: 'bad_request',
   401: 'unauthorized',
   402: 'payment_required',
   403: 'forbidden',
   404: 'not_found',
   407: 'proxy_authentication_required',
   409: 'conflict',
   410: 'gone',
   413: 'content_too_large',
   415: 'unsupported_media_type',
   422: 'unprocessable_content',
   423: 'locked',
   429: 'too_many_requests',

   500: 'internal_server_error',
   502: 'bad_gateway',
   503: 'service_unavailable',
   507: 'insufficient_storage',
} as const

// ========== Helper ==========

// /**
//  * Helper that takes a dict of http status codes and return a formatted http map
//  *
//  * @param input
//  * @returns
//  */
// function createHttpMap<T extends Record<number, string>>(input: T) {
//    return Object.fromEntries(
//       Object.entries(input).map(([code, message]) => {
//          return [`${code}_${message}`, { status: Number(code), message }]
//       }),
//    ) as { [K in keyof T as `${K & number}_${T[K] & string}`]: { status: K, message: T[K] } }
// }

// const httpMap = createHttpMap(HTTP_STATUS_CODES)

// ========== Types ==========

type HttpMap = typeof HTTP_STATUS_CODES
type Status = keyof HttpMap
type Message = HttpMap[Status]
type Code = { [K in Status]: `${K & number}_${HttpMap[K]}` }[Status]
type HttpEntry = { code: string; status: number; message: string }

// ========== Helper ==========

const httpEntries: HttpEntry[] = Object.entries(HTTP_STATUS_CODES).map(
   ([status, message]) => ({
      code: `${status}_${message}` as string,
      status: Number(status) as number,
      message
   })
)

function fromHttpCode(code: Code): HttpEntry {
   const entry = httpEntries.find((entry) => entry.code === code)
   return entry ?? {
      code: '500_internal_server_error',
      status: 500,
      message: 'internal_server_error'
   }
}

function fromHttpStatus(status: Status): HttpEntry {
   const entry = httpEntries.find((entry) => entry.status === status)
   return entry ?? {
      code: '500_internal_server_error',
      status: 500,
      message: 'internal_server_error'
   }
}

function fromHttpMessage(message: Message): HttpEntry {
   const entry = httpEntries.find((entry) => entry.message === message)
   return entry ?? {
      code: '500_internal_server_error',
      status: 500,
      message: 'internal_server_error'
   }
}

// ========== Export ==========

export { fromHttpCode, fromHttpStatus, fromHttpMessage }
