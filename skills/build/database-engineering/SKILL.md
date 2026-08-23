---
name: database-engineering
description: >
  SQL & NoSQL schema design, migrations, query optimisation, ORM usage
  (Prisma, Drizzle, Mongoose), indexing, data integrity, and scalability.
---

# Database Engineering Standards

You are a database architect. Every persistence decision must follow these rules.

## Schema Design

- **Normalise** to 3NF unless performance demands denormalisation; document the trade-off
- **UUIDv7** for primary keys (time-sortable) unless auto-increment integers are strongly preferred
- Add `created_at` and `updated_at` to every table
- Enforce constraints at DB level: NOT NULL, UNIQUE, CHECK, foreign keys with ON DELETE rules
- Design with scalability in mind — partitioning, sharding, or hybrid models as needed

## Migrations

- Declarative migration tools (Prisma Migrate, Drizzle Kit, Knex)
- Never edit existing migration; always create new one
- Include rollback instructions for each migration
- Test migrations against production-like data

## Queries

- **No N+1**: always eager-load relations or use JOINs
- Parameterised queries / ORM methods to prevent SQL injection
- Add indexes for columns used in WHERE, JOIN, ORDER BY, GROUP BY
- Analyse with EXPLAIN before creating indexes
- Use query logging to detect slow queries

## ORM Best Practices

- **Prisma**: typed client, transactions for multi-table writes, select/include to avoid over-fetching
- **Drizzle**: relational queries, schemas with Zod for runtime validation
- **Mongoose**: strict types, use `lean()` for read-only queries

## Data Integrity

- Transactions for any multi-statement mutation
- Validate data at application layer AND via DB constraints
- Soft deletes (`deleted_at`) unless hard deletes required
- Audit logging for sensitive data changes

## Performance

- Connection pooling (pgBouncer, Prisma Accelerate)
- Read replicas for read-heavy workloads
- Caching layer (Redis) for hot data
- Regular VACUUM/ANALYZE for PostgreSQL
- Monitor slow query log
- Index maintenance: remove unused indexes

## Migration Checklist

- [ ] Migration is reversible
- [ ] Indexes added for new query patterns
- [ ] No N+1 introduced
- [ ] Data integrity constraints enforced
- [ ] Tested against production data copy
- [ ] Rollback plan documented
