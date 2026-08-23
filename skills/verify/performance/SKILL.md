---
name: performance
description: >
  Performance optimization: profiling, benchmarking, identifying bottlenecks,
  memory management, concurrency optimization, and caching strategies.
---

# Performance Optimization

You are a performance engineer. You make systems faster.

## Profiling Hierarchy

1. **Define baseline** — measure before optimizing
2. **Identify bottleneck** — where is time actually spent?
3. **Optimize** — fix the bottleneck
4. **Measure** — compare against baseline
5. **Repeat** — next bottleneck

## Common Bottlenecks

| Pattern                | Symptom                    | Fix                                |
| ---------------------- | -------------------------- | ---------------------------------- |
| N+1 queries            | Many DB calls per request  | Eager load, batch, DataLoader      |
| Missing indexes        | Slow queries               | Add indexes, ANALYZE               |
| Large payloads         | Slow response, high memory | Pagination, streaming, compression |
| Blocking event loop    | UI freezes, slow requests  | Worker threads, async              |
| Memory leaks           | Growing RSS, GC pressure   | Clean listeners, weak refs         |
| Unnecessary work       | CPU waste                  | Memoization, caching               |
| Serialization overhead | JSON parse/stringify cost  | Stream, binary formats             |
| Lock contention        | Slow under concurrency     | Optimistic locking, sharding       |

## Optimization Techniques

### JavaScript/TypeScript

- **Memoization**: cache expensive pure function results
- **Debounce/throttle**: limit frequent event handlers
- **Lazy loading**: defer non-critical work
- **Web Workers**: offload CPU-intensive tasks
- **Streams**: process large data incrementally
- **Avoid**: spread on large arrays, nested loops on large data

### Database

- **Indexes**: B-tree for equality/range, GIN for JSON/array, GiST for full-text
- **Query optimization**: EXPLAIN ANALYZE, avoid sequential scans
- **Connection pooling**: reuse connections, not per-request
- **Read replicas**: offload read traffic
- **Caching**: Redis for hot data, TTL-based invalidation

### Network

- **Compression**: gzip/brotli for responses
- **Keep-alive**: reuse TCP connections
- **HTTP/2**: multiplexing, server push
- **CDN**: static assets, cache at edge
- **Batching**: combine multiple requests

## Caching Strategy

| Cache Level      | Duration        | Invalidation          |
| ---------------- | --------------- | --------------------- |
| Browser          | Long (assets)   | Versioned URLs        |
| CDN              | Medium          | Cache tags, purge API |
| Application      | Short (seconds) | TTL, write-through    |
| Database (query) | Very short      | Statement-level       |

## Performance Targets

| Metric              | Target | Warning | Critical |
| ------------------- | ------ | ------- | -------- |
| Response time (p50) | <100ms | <500ms  | >1s      |
| Response time (p99) | <500ms | <2s     | >5s      |
| CPU usage           | <60%   | <80%    | >90%     |
| Memory usage        | <70%   | <85%    | >95%     |
| Error rate          | <0.1%  | <1%     | >5%      |
| Throughput          | Target |         |          |

## Measurement Tools

- Node.js: --prof, clinic.js, 0x (flamegraphs)
- Database: EXPLAIN ANALYZE, pg_stat_statements
- Frontend: Lighthouse, Web Vitals
- APM: OpenTelemetry, Datadog, Grafana
- Load testing: k6, autocannon, wrk
