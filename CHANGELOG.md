# @naceventures/errors

## 1.0.0

### Major Changes

- Add Base error class 'AppError'
- Add 'createErrorClassFromMap' to create custom error classes
- Add 'fromHttpCode', 'fromHttpStatus' and 'fromHttpMessage' helpers to get HTTP info from code, status or message
- Add 'trycatch' to wrap throwable synchronous function or asynchronous/promise that can fail
