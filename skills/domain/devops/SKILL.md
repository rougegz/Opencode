---
name: devops
description: >
  DevOps and infrastructure patterns: containerization, orchestration,
  monitoring, observability, CI/CD, secrets management, and cloud
  deployment for Node.js/TypeScript applications.
---

# DevOps Standards

## Container Best Practices

- Multi-stage builds (builder → runner)
- Distroless or alpine base images
- Non-root user in container
- Read-only filesystem where possible
- Health checks configured
- Resource limits set (CPU, memory)
- Labels for organisation

## Docker Compose (Development)

```yaml
version: "3.8"
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/app
      - REDIS_URL=redis://redis:6379
    depends_on: [db, redis]
    volumes: [.:/app, /app/node_modules]
  db:
    image: postgres:16-alpine
    environment: { POSTGRES_PASSWORD: password }
    volumes: [pgdata:/var/lib/postgresql/data]
  redis:
    image: redis:7-alpine
volumes: { pgdata }
```

## Observability Stack

- **Logs**: Structured JSON (pino) → Loki/Grafana
- **Metrics**: OpenTelemetry → Prometheus → Grafana
- **Traces**: OpenTelemetry → Jaeger/Tempo
- **Alerts**: Grafana Alerting / PagerDuty
- **Dashboards**: Grafana for key metrics (error rate, latency, throughput)

## Secrets Management

- Never in code, never in Docker images
- Environment variables for runtime (injected by orchestrator)
- Use Vault, AWS Secrets Manager, or Kubernetes Secrets
- Encrypt secrets at rest and in transit
- Rotate secrets regularly

## Infrastructure as Code

- Terraform/OpenTofu for cloud resources
- Ansible for configuration management
- Helm for Kubernetes packaging
- Version-controlled infrastructure

## Monitoring Checklist

- [ ] Health endpoints (liveness + readiness)
- [ ] Structured logging with correlation IDs
- [ ] Request metrics (rate, errors, duration)
- [ ] System metrics (CPU, memory, disk, network)
- [ ] Database metrics (connections, query time, slow queries)
- [ ] Uptime monitoring
- [ ] Alerting on error rate >1%
- [ ] Dashboard for key metrics
