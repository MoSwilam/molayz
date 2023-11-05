# localhost file
# Start from the node.js base image
FROM node:16

LABEL maintainer="Felipe Lima <felipe@relayz.io>"
LABEL "com.relayz.io.vendor"="Relayz.Ltd"
LABEL com.relayz.io.label-with-value="relayz.io"
LABEL version="1.0.1"
LABEL description="© 2023 Relayz | API | Docker Image"

ENV APP_HOME="/relayz/api"
ENV NODE_ENV=local

WORKDIR ${APP_HOME}

COPY .npmrc package*.json ${APP_HOME}/

RUN npm install --legacy-peer-deps

COPY . ${APP_HOME}/
CMD [ "npm", "run", "start:prd" ]
