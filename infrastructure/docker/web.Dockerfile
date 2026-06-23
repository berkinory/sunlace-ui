FROM oven/bun:1.3.3-slim AS base

FROM base AS pruner
WORKDIR /app

RUN bun add -g turbo@2.9.5

COPY . .

RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app

COPY --from=pruner /app/out/json/ .

COPY --from=pruner /app/out/bun.lock ./bun.lock

RUN bun install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

FROM installer AS builder
WORKDIR /app

ARG VITE_RYBBIT_SITE_ID

ENV VITE_RYBBIT_SITE_ID=$VITE_RYBBIT_SITE_ID

RUN bun run --cwd apps/web build

FROM base AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends adduser && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 vite && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=builder --chown=vite:nodejs /app/apps/web/dist ./dist

USER vite

EXPOSE 5012

ENV NODE_ENV=production
ENV PORT=5012
ENV HOSTNAME="0.0.0.0"

CMD ["bunx", "serve", "./dist", "-s", "-l", "5012"]
