---
name: arch-design
description: >
  System architecture design patterns: component decomposition, dependency
  management, data flow, scalability, and technology selection. Produces
  architecture decision records (ADRs).
---

# Architecture Design

## Design Process

1. **Gather requirements**: functional + non-functional (performance, scalability, security)
2. **Identify components**: bounded contexts, modules, services
3. **Define interfaces**: contracts between components
4. **Select technologies**: based on requirements, team skills, ecosystem
5. **Design data flow**: how data moves through the system
6. **Address cross-cutting**: logging, auth, monitoring, error handling
7. **Document decisions**: ADR for every significant choice

## Architecture Patterns

| Pattern                    | Use When                            | Trade-off                                |
| -------------------------- | ----------------------------------- | ---------------------------------------- |
| Modular Monolith           | Small team, early stage             | Simpler ops, harder to scale teams       |
| Microservices              | Large team, independent scaling     | Complex ops, data consistency challenges |
| Event-Driven               | Async workflows, reactivity         | Eventual consistency, debugging harder   |
| CQRS                       | Different read/write patterns       | More code, eventual consistency          |
| Hexagonal (Ports/Adapters) | Testability, framework independence | More interfaces, indirection             |
| Layered                    | Simple CRUD apps                    | Tight coupling if not disciplined        |

## Component Design Rules

- **Single Responsibility**: one reason to change per component
- **Dependency Inversion**: depend on abstractions, not concretions
- **Interface Segregation**: small, focused interfaces
- **Liskov Substitution**: subtypes must be substitutable for base types
- **Open/Closed**: open for extension, closed for modification

## Data Flow Design

```typescript
// Data flow layers (hexagonal architecture)
// External → Controller → Use Case → Domain → Repository → Database
//                ↓                        ↓
//           Validation (Zod)        Business Rules
```

## Technology Selection Criteria

| Criterion     | Weight | Description                                |
| ------------- | ------ | ------------------------------------------ |
| Maturity      | High   | Production-proven, stable releases         |
| Ecosystem     | High   | Tools, libraries, community                |
| TypeScript/JS | High   | Type safety, developer experience          |
| Performance   | Medium | Meets requirements, not over-engineered    |
| Bundle Size   | Low    | Unless targeting browser or serverless     |
| Maintenance   | High   | Active development, responsive maintainers |
| Documentation | Medium | Clear docs, examples, tutorials            |

## Architecture Decision Record (ADR)

Every ADR must include:

1. **Title**: ADR-NNN: Decision Name
2. **Status**: proposed | accepted | deprecated | superseded
3. **Context**: what forces are at play
4. **Decision**: what was decided
5. **Consequences**: trade-offs to accept
6. **Alternatives**: what else was considered and why rejected
