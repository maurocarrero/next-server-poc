# Install DEV dependencies:
FROM node:12.16.2-alpine3.9 AS devDeps
WORKDIR /service
COPY package*.json /service/
RUN chmod +rwx /service
RUN npm config set loglevel notice && npm install --verbose

# TEST stage:
FROM node:12.16.2-alpine3.9 AS unitTests
WORKDIR /service
COPY --from=devDeps /service/node_modules /service/node_modules
COPY package.json .babelrc next.config.js /service/
COPY ./components /service/components
COPY ./pages /service/pages
COPY ./styles /service/styles
CMD ["npm", "test"]

# BUILD stage:
FROM node:12.16.2-alpine3.9 AS builder
WORKDIR /service
ARG stage=build-in-container
COPY --from=devDeps /service/node_modules /service/node_modules
COPY package.json next.config.js .env.example .eslintrc.yml .prettierrc.js /service/
COPY .env.example /service/.env
COPY ./components /service/components
COPY ./pages /service/pages
COPY ./styles /service/styles
RUN npm run build

# RUN stage (default target):
# Install PROD dependencies.
FROM node:12.16.2-alpine3.9
WORKDIR /service
COPY --from=builder /service/.next /service/.next
COPY package*.json .env.example next.config.js /service/
COPY ./server /service/server
RUN npm install --production --verbose
ENV stage=run-in-container
EXPOSE 3000
CMD ["npm", "start"]
