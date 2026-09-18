FROM node:22-bookworm-slim AS deps

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --fetch-retries=5
RUN npx prisma generate

FROM deps AS tools

COPY prisma.config.ts ./
COPY prisma ./prisma
COPY scripts ./scripts
COPY src ./src

FROM deps AS production-deps

RUN npm prune --omit=dev

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY --from=production-deps /app/node_modules ./node_modules
COPY package*.json ./
COPY prisma ./prisma
COPY public ./public
COPY scripts ./scripts
COPY src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]
