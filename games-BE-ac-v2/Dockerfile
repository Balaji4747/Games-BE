FROM node:20-alpine
EXPOSE 3000 3001 3002 3003 3004
ARG APP
WORKDIR /app
COPY package*.json .
COPY yarn.lock .
COPY .yarnrc.yml .

RUN apk --no-cache add curl

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN corepack enable
RUN yarn install
COPY nest-cli.json .
COPY tsconfig*.json .
COPY apps /app/apps
COPY libs /app/libs
RUN yarn build ${APP}

HEALTHCHECK CMD curl -f http://localhost:${APP_PORT}/health || exit 1

ENV DEPLOY_COMMAND="node /app/dist/apps/${APP}/main"
CMD $DEPLOY_COMMAND