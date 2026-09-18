# BleachVerse

BleachVerse is a REST API and hybrid search engine for Bleach domain data. Its unified search combines local semantic retrieval, exact relational filters, and Neo4j graph traversal through a deterministic query classifier.

## Search Architecture

```text
                         +-----------------------+
GET /api/v1/search --->  | Query classifier      |
                         | rules + entity resolver|
                         +-----------+-----------+
                                     |
                 +-------------------+-------------------+
                 |                   |                   |
                 v                   v                   v
       PostgreSQL + pgvector       Neo4j          PostgreSQL
       semantic similarity       relationships   exact filters
                 |                   |                   |
                 +-------------------+-------------------+
                                     |
                           aggregate and rank
                                     |
                         hydrate entities in PostgreSQL
```

The embedding model is `Xenova/all-MiniLM-L6-v2`, executed locally through Transformers.js. No external LLM or embedding API is required.

## Capabilities

- Semantic character and lore discovery through pgvector
- Exact filters for roles, races, and factions
- `FOUGHT` and `TRAINED_BY` graph queries
- Database-backed character names and aliases
- Confidence-gated fuzzy name matching
- Union and intersection across retrieval sources
- Redis query-embedding cache and rate limiting
- OpenAPI documentation and strict unit/integration coverage

The unified classifier currently focuses on character retrieval. It is not a general question-answering system and does not answer comparisons or exact fight facts such as “who won between Aizen and Ichigo.”

## Requirements

- Node.js 22 or newer
- Docker Desktop with Docker Compose
- At least 2 GB of free memory for PostgreSQL, Neo4j, Redis, and local embedding indexing

The first semantic indexing run downloads the MiniLM model and can take several minutes.

## Docker Setup

Copy the environment template:

```bash
cp .env.example .env
```

Start PostgreSQL with pgvector, Redis, and Neo4j:

```bash
npm run docker:up
```

Initialize the relational schema, seed domain data, build semantic embeddings, and synchronize Neo4j:

```bash
npm run docker:setup
```

Setup applies migrations, seeds records, and upserts semantic documents and graph data. It does not reset the vector table. Back up existing databases before migrations.

Start the API container:

```bash
npm run docker:api
```

The Docker API is available at `http://localhost:3001` by default:

```bash
curl http://localhost:3001/health
```

To inspect services or stop them:

```bash
docker compose ps
docker compose down
```

Named volumes preserve database data. Use `docker compose down -v` only when you explicitly want to delete all local BleachVerse data.

## Host Development

Start only the infrastructure containers:

```bash
npm run docker:up
```

Install dependencies and generate the Prisma client:

```bash
npm ci
npx prisma generate
```

With the default `.env.example` connection strings, initialize data from the host:

```bash
npx prisma migrate deploy
npx prisma db seed
npm run semantic:index
npm run graph:sync
```

Start the development server:

```bash
npm run dev
```

The host API uses `http://localhost:3000` by default.

## Search API

Use `mode=AUTO` to exercise query classification.

```bash
curl --get http://localhost:3000/api/v1/search \
  --data-urlencode "q=Espada who fought Ichigo and are brutal" \
  --data "mode=AUTO" \
  --data "limit=5"
```

Common examples:

| Query | Sources |
|---|---|
| `bankai getsuga tensho` | pgvector |
| `captains` | pgvector + PostgreSQL |
| `who fought Byakuya` | Neo4j |
| `Espada who fought Ichigo` | Neo4j + PostgreSQL |
| `Espada who fought Ichigo and are brutal` | pgvector + Neo4j + PostgreSQL |

Parameters for `GET /api/v1/search`:

| Parameter | Default | Description |
|---|---:|---|
| `q` | required | Query between 2 and 200 characters |
| `mode` | `AUTO` | `AUTO`, `SEMANTIC`, `GRAPH`, or `HYBRID` |
| `limit` | `10` | Results from 1 to 50 |
| `threshold` | `0.4` | Minimum semantic similarity from 0 to 1 |
| `hydrate` | `true` | Include complete relational entities |

Interactive OpenAPI documentation is served at `/api-docs`. A generated specification is available at [public/swagger/swagger.json](public/swagger/swagger.json).

## Other API Modules

The REST API also exposes characters, arcs, episodes, fights, organizations, Zanpakuto, locations, races, quotes, events, powers, transformations, appearances, and relationships. Swagger is the source of truth for endpoint parameters and response contracts.

## Testing

Run the complete suite:

```bash
npm test
```

Search tests cover query routing, fuzzy and ambiguous entity resolution, semantic thresholds, source intersection, graph constraints, ranking, hydration, and API validation.

## Environment

Important variables are documented in [.env.example](.env.example):

- `DATABASE_URL` and `DIRECT_URL`: PostgreSQL application and migration connections
- `NEO4J_*`: Neo4j connection and startup policy
- `REDIS_URL`: cache and distributed rate-limit connection
- `EMBEDDING_PROVIDER`: use `transformers` for local embeddings
- `TRANSFORMERS_EMBEDDING_MODEL`: local Hugging Face model identifier
- `EMBEDDING_DIMENSIONS`: must match the pgvector column; currently `384`

Never commit `.env` or production credentials.

## Dependency Review

On September 18, 2026, `npm audit --omit=dev` reported four high-severity
entries in the Prisma CLI dependency chain (`prisma`, `@prisma/config`,
`deepmerge-ts`, and `mysql2`). These represent two underlying dependency
groups, not four independently exercised application features. Prisma is
also retained through the client's optional peer dependency after pruning.

The API uses PostgreSQL through `@prisma/adapter-pg`; it does not connect to
MySQL or accept user-provided Prisma configuration. This reduces the apparent
exposure of the reported MySQL protocol and recursive configuration-merge
issues, but does not make the installed packages patched. Review this again
before deployment and when Prisma releases compatible fixes. Do not apply
`npm audit fix --force` blindly: the current proposed resolution downgrades
Prisma to version 6. Full development-dependency findings also remain.

## Data Refresh

After changing source entities or semantic document builders, rebuild embeddings:

```bash
npm run semantic:index
```

Run `npm run semantic:reset` first only when changing embedding dimensions or intentionally rebuilding the vector table. After changing graph-backed entities or relationships, run:

```bash
npm run graph:sync
```
