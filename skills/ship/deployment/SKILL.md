---
name: deployment
description: >
  Deployment standards: Docker configuration, orchestration, monitoring,
  logging, health checks, and production readiness checklist.
---

# Deployment Standards

## Dockerfile Standards

```dockerfile
# Multi-stage build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system app && adduser --system --ingroup app app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --production --ignore-scripts
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]
```

## Health Check Endpoints

### Liveness (is process alive?)

```
GET /health → 200 OK
```

### Readiness (can process requests?)

```
GET /ready → 200 OK (all dependencies available)
Response: { "status": "ok", "uptime": 1234, "dependencies": { "db": "ok", "redis": "ok" } }
```

### Startup (initialisation complete?)

```
GET /startup → 200 OK
```

## Logging in Production

- Structured JSON (pino)
- Every log: timestamp, level, message, service, requestId
- Log levels: trace, debug, info, warn, error, fatal
- No PII in logs (redact: ['password', 'token', 'ssn', 'email'])
- Centralised log aggregation (ELK, Loki, Datadog)
- Async logging (never block the event loop for logging)

## Monitoring & Alerting

| What            | How                    | Alert at                |
| --------------- | ---------------------- | ----------------------- |
| Error rate      | Log-based metrics      | >1% error rate in 5min  |
| Response time   | APM                    | p99 > 1s for 5min       |
| CPU/Memory      | System metrics         | CPU > 80%, Memory > 85% |
| Disk space      | System metrics         | Disk > 85%              |
| Health check    | Endpoint monitoring    | 2 consecutive failures  |
| TLS cert expiry | Certificate monitoring | <30 days remaining      |

## Graceful Shutdown

```typescript
process.on("SIGTERM", async () => {
  console.log("SIGTERM received — shutting down gracefully");
  server.close(); // Stop accepting connections
  await db.destroy(); // Close database pool
  await cache.disconnect(); // Close Redis
  await flushLogs(); // Flush log buffer
  process.exit(0);
});
```

## Production Checklist

- [ ] Dockerfile with multi-stage build
- [ ] Health check endpoints (liveness + readiness)
- [ ] Graceful shutdown on SIGTERM
- [ ] Structured JSON logging
- [ ] Centralised log aggregation
- [ ] Monitoring and alerting configured
- [ ] Error tracking (Sentry, etc.)
- [ ] Rate limiting (reverse proxy or app layer)
- [ ] HTTPS enforced
- [ ] Secure headers (Helmet)
- [ ] Secrets via environment variables (not files)
- [ ] Non-root user in container
- [ ] Read-only filesystem where possible
- [ ] Resource limits (CPU, memory)
- [ ] Health check in Dockerfile
- [ ] Backup strategy for data
