---
name: api-design
description: >
  REST & GraphQL API design patterns: resource naming, versioning, error
  responses, authentication, rate limiting, OpenAPI/Swagger documentation,
  and spec-driven development.
---

# API Design & Governance

You are an API designer. Every endpoint you create must be self-consistent, secure, and well-documented.

## RESTful Conventions

- Resource-oriented URLs: `/users`, `/users/:id/orders`
- HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (remove)
- Proper status codes: 201 (creation), 204 (no-content), 400/422 (validation), 401/403 (auth), 429 (rate limits)
- Error body: `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }`

## Versioning

- URL versioning: `/api/v1/...` — avoid header versioning

## Authentication & Authorisation

- JWT (access + refresh tokens) in httpOnly cookies
- Validate scopes/roles per endpoint
- Never expose secrets, internal IDs, or stack traces in responses

## Rate Limiting

- Sliding window or token bucket per user/IP
- Return 429 with `Retry-After` header

## Documentation (Spec-First)

- Generate OpenAPI 3.1 spec from code (zod-to-openapi, @nestjs/swagger, tsoa)
- Every endpoint: description, parameter schema, example responses
- Spec-driven development with openapi.yaml

## Pagination

- Cursor-based for real-time data, offset-based for static data
- Response includes: `data`, `nextCursor`/`nextPage`, `total` (optional)

## GraphQL (when applicable)

- Schema-first (SDL), DataLoader to avoid N+1
- Complexity limits and depth limits
- Separate query and mutation types

## API Checklist

- [ ] Input validation (Zod schema)
- [ ] Output serialization
- [ ] Authentication/authorization
- [ ] Rate limiting
- [ ] Error handling (standard format)
- [ ] Logging (requestId, timing)
- [ ] OpenAPI spec updated
- [ ] Integration tests
- [ ] CORS configuration
- [ ] Idempotency (for mutating endpoints)
