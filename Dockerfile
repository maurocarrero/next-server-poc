# BUILD stage:
# 1. install all dependencies
# 2. build application
FROM node:12.16.2-alpine3.9 AS builder
WORKDIR /service

ARG stage=build-in-container

COPY package*.json /service/
RUN chmod +rwx /service

RUN npm config set loglevel notice && npm install --verbose

COPY next.config.js .env.example .eslintrc.yml .prettierrc.js /service/
COPY .env.example /service/.env
COPY ./components /service/components
COPY ./pages /service/pages
COPY ./styles /service/styles

RUN npm run build

# RUN stage:
# 1. get the application built for production in the previous stage
# 2. install production dependencies
FROM node:12.16.2-alpine3.9
WORKDIR /service

COPY --from=builder /service/.next /service/.next

COPY package*.json .env.example next.config.js /service/
COPY ./server /service/server

RUN npm install --production --verbose

ENV stage=run-in-container

EXPOSE 3000

CMD ["npm", "start"]
