# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Next.js"

# Next.js app directory
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED=1

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install dependencies using npm install with legacy peer deps for React 19 compatibility
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy application source code
COPY . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev --legacy-peer-deps

# Final stage for app image
FROM base

# Copy built application and node modules
COPY --from=build /app /app

# Expose port (Fly.io standard port)
EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Start Next.js + Telegram Bot simultaneously
CMD [ "npm", "run", "start:all" ]
