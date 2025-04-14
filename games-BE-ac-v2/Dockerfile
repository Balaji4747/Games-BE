# Use official Node.js Alpine image
FROM node:20-alpine

# Expose potential app ports
EXPOSE 3000 3001 3002 3003 3004

# Argument to specify which app to build/run
ARG APP

# Set working directory
WORKDIR /app

# Copy package definitions and lock files
COPY package*.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./

# Install curl for health checks
RUN apk --no-cache add curl

# Set and expose NODE_ENV
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Enable corepack and install dependencies
RUN corepack enable
RUN yarn install

# Copy config and source code
COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY apps /app/apps
COPY libs /app/libs

# Build the specified app
RUN yarn build ${APP}

# Healthcheck using environment variable APP_PORT
HEALTHCHECK CMD curl -f http://localhost:${APP_PORT}/health || exit 1

# Run the compiled NestJS app (app name comes from build arg)
CMD ["sh", "-c", "node /app/dist/apps/${APP}/main"]
