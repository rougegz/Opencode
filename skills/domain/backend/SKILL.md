---
name: backend
description: >
  Backend development patterns: REST API design, middleware, authentication,
  authorization, error handling, logging, and service architecture for
  Node.js/TypeScript backends.
---

# Backend Development Standards

## Application Structure

```
src/
├── routes/          # Route definitions → controller mapping
├── controllers/     # Request handling, response formatting
├── use-cases/       # Business logic, orchestration
├── domain/          # Business entities, value objects
├── repositories/    # Data access, ORM integration
├── middleware/      # Auth, logging, rate limiting, error handling
├── validators/      # Zod schemas per endpoint
├── config/          # Environment config, constants
├── errors/          # Custom error classes
├── logger.ts        # Pino logger configuration
└── server.ts        # App setup, middleware registration
```

## Middleware Stack (order matters)

1. Request logging (requestId, timing)
2. Security headers (Helmet)
3. CORS
4. Body parsing (JSON, URL-encoded)
5. Rate limiting
6. Authentication (JWT validation)
7. Authorization (role/permission check)
8. Request validation (Zod)
9. Route handler
10. Error handler (catch-all)

## Error Handling Middleware

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
  }
  logger.error({ err, requestId: req.id }, "Unhandled error");
  return res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" },
  });
});
```

## Service Layer Patterns

- Use case classes encapsulate business logic
- Repositories abstract data access (interface + implementation)
- Dependency injection through constructor or factory functions
- Services are stateless (state in DB or cache)

## Authentication & Authorization

- JWT-based auth with short-lived access tokens (15min)
- Refresh tokens with rotation (7 day expiry)
- Bearer token in Authorization header
- Role-based access control (RBAC) or attribute-based (ABAC)
- Passport.js or custom middleware for auth

## API Response Format

```typescript
// Success
{ "data": T, "meta": { "page": 1, "total": 100 } }
// Error
{ "error": { "code": string, "message": string, "details?: unknown } }
```
