# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Next.js"

# Next.js app directory
WORKDIR /app

# Throw-away build stage to build the Next.js app
FROM base AS build

# Install packages needed for build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 curl ca-certificates

# Ensure dev dependencies (TypeScript, PostCSS Tailwind, types) are installed for building
COPY package.json package-lock.json* ./
RUN npm install --include=dev --legacy-peer-deps --ignore-scripts

# Copy application source code
COPY . .

# Build application with increased memory headroom and disabled telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Remove development dependencies to keep the image slim
RUN npm prune --omit=dev --legacy-peer-deps --ignore-scripts

# Final stage for app image
FROM base

# Set production environment for runtime
ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application and node modules
COPY --from=build /app /app

# Expose port (Fly.io standard port)
EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Start Next.js + Telegram Bot simultaneously
CMD [ "npm", "run", "start:all" ]
