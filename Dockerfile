FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate
RUN npm prune --omit=dev

FROM node:22-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY prisma ./prisma
COPY public ./public
COPY scripts ./scripts
COPY src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]
