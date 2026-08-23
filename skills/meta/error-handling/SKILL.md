---
name: error-handling
description: >
  Production error handling patterns: custom error classes, Result types,
  graceful degradation, recovery strategies, and circuit breakers.
  Comprehensive error taxonomy and handling strategies.
---

# Error Handling & Recovery

## Error Taxonomy

| Category       | Examples                                   | Strategy                                      |
| -------------- | ------------------------------------------ | --------------------------------------------- |
| Validation     | Invalid input, missing fields, wrong types | Zod schema, fail-fast, user feedback          |
| Business Logic | Insufficient permissions, state conflicts  | Custom errors with codes, user messages       |
| Infrastructure | Network timeout, DB down, disk full        | Retry with backoff, circuit breaker, fallback |
| Dependency     | API changed, package removed               | Version pinning, graceful degradation         |
| Runtime        | Out of memory, stack overflow              | Process restart, resource limits              |
| Concurrency    | Race conditions, deadlocks                 | Locks, transactions, idempotency keys         |

## Error Response Standards

```typescript
// API error response format
{
  error: {
    code: string;        // e.g. "VALIDATION_ERROR", "RATE_LIMITED"
    message: string;     // Human-readable description
    details?: unknown[]; // Field-level errors or additional context
    requestId?: string;  // Correlation ID for debugging
  }
}
```

## Custom Error Classes

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION_ERROR", 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, "NOT_FOUND", 404);
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter: number) {
    super("Rate limit exceeded", "RATE_LIMITED", 429, { retryAfter });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, "UNAUTHORIZED", 401);
  }
}
```

## Retry Strategy

| Error Type       | Retry? | Backoff              | Max Attempts |
| ---------------- | ------ | -------------------- | ------------ |
| Network timeout  | Yes    | Exponential + jitter | 3            |
| 429 Rate limit   | Yes    | Retry-After header   | 3            |
| 5xx Server error | Yes    | Exponential + jitter | 3            |
| 4xx Client error | No     | —                    | 0            |
| Validation error | No     | —                    | 0            |
| Circuit open     | No     | Wait for half-open   | —            |

## Graceful Degradation

- Degrade features, not the whole system
- Return stale cached data when fresh unavailable
- Use default values when remote data fails
- Flag degraded state in response headers (`X-Degraded: true`)
- Log every degradation for post-mortem analysis

## Circuit Breaker Pattern

```
CLOSED → (failures > threshold) → OPEN → (timeout) → HALF_OPEN → (success) → CLOSED
                                          ↓                           ↓
                                     (fail) → OPEN          (fail) → OPEN
```

## Logging Standards

- Structured JSON logging (pino)
- Every log entry: timestamp, level, message, requestId, service
- Error logs: stack trace, error code, metadata, correlation IDs
- Never log secrets, tokens, or PII
- Log context via AsyncLocalStorage (requestId, userId, traceId)
