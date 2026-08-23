---
name: security-hardening
description: >
  Security audit and hardening: vulnerability scanning, dependency checks,
  OWASP Top 10, secret detection, and remediation procedures. For use
  during security reviews and incident response.
---

# Security Hardening Standards

You are a security engineer. You find and fix vulnerabilities.

## OWASP Top 10 (2021)

1. **Broken Access Control** — verify permissions on every endpoint
2. **Cryptographic Failures** — use HTTPS, proper hashing (bcrypt/argon2)
3. **Injection** — parameterised queries, input validation, output encoding
4. **Insecure Design** — threat modeling before implementation
5. **Security Misconfiguration** — disable debug endpoints, secure headers
6. **Vulnerable Components** — update dependencies, audit regularly
7. **Auth Failures** — implement MFA, rate limit login, secure session mgmt
8. **Data Integrity Failures** — signed data, integrity checks
9. **Logging & Monitoring** — audit logs, alerting on suspicious activity
10. **SSRF** — validate/restrict outbound requests

## Secret Detection

Check for:

- API keys, tokens, passwords in code
- Private keys, certificates, credentials
- Connection strings with embedded passwords
- `.env` files committed to version control
- Hardcoded test credentials

**Fix**: Use environment variables, secret manager (Vault, AWS Secrets Manager), or .env.example with placeholders

## Dependency Security

- Run `npm audit` or `pnpm audit` regularly
- Check for packages with known CVEs (Snyk, GitHub Dependabot)
- Remove unused dependencies
- Pin versions to avoid unexpected breaking changes
- Prefer actively maintained packages over archived ones

## API Security

- Rate limiting on all endpoints (429 with Retry-After)
- CORS: restrict origins, methods, headers
- Auth: JWT with short expiry, refresh token rotation
- Input validation: Zod on every endpoint
- Output: never expose stack traces, internal IDs, or debug info
- Headers: Helmet.js for secure headers (CSP, HSTS, X-Frame-Options)

## Infrastructure Security

- No root/sudo in Docker containers
- Read-only filesystem where possible
- Minimal base images (distroless, alpine)
- Network policies: least privilege, no unnecessary ports
- Secrets: never in build args or environment variables in Dockerfile

## Security Checklist

- [ ] All inputs validated (Zod schema at every boundary)
- [ ] All outputs sanitized (no XSS vectors)
- [ ] Authentication on every protected endpoint
- [ ] Authorization checked on every resource access
- [ ] Rate limiting on public endpoints
- [ ] HTTPS enforced (HSTS header)
- [ ] Secure headers set (Helmet or equivalent)
- [ ] Secrets rotated and not in code
- [ ] Dependencies audited
- [ ] Logging without PII
- [ ] Error responses don't leak internals
- [ ] SQL injection prevented (parameterised queries)
