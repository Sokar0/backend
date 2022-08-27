# FROM node:lts-slim as builder
FROM alpine:3.15 as builder

ENV NODE_VERSION 16.17.0

LABEL version="1.0.0"
LABEL description="CPS/MS_Template Docker Image"
LABEL maintainer="Ornelio Hinterholz Junior <ornelio.hinterholz@bentley.com>"

RUN apk add --update nodejs npm

WORKDIR /app

# set default node env
ARG NODE_ENV=local

# ARG NODE_ENV=production
# to be able to run tests (for example in CI), do not set production as environment
ENV NODE_ENV=${NODE_ENV}

ENV NPM_CONFIG_LOGLEVEL=warn

COPY --chown=nodejs:nodejs package*.json ./

# install dependencies here, for better reuse of layers
RUN npm install && npm audit fix && npm cache clean --force

# copy all sources in the container (exclusions in .dockerignore file)
COPY --chown=nodejs:nodejs . .

EXPOSE 3123
CMD npm run start