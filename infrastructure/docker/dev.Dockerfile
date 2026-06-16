FROM oven/bun:1.3.3-slim AS base

WORKDIR /app

COPY package.json bun.lock tsconfig.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/config/package.json ./packages/config/package.json

RUN bun install --frozen-lockfile --ignore-scripts
