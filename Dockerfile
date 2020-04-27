FROM node:12.16.2-alpine3.9 as builder
WORKDIR /service

COPY package*.json /service/
RUN chmod +rwx /service

RUN npm config set loglevel notice && npm install --verbose

COPY next.config.js .env.example .eslintrc.yml .prettierrc.js /service/
COPY .env.example /service/.env
COPY ./components /service/components
COPY ./pages /service/pages
COPY ./styles /service/styles

RUN npm run build

########################################################################

FROM node:12.16.2-alpine3.9
WORKDIR /service

COPY --from=builder /service/.next /service/.next
COPY --from=builder /service/next.config.js /service/next.config.js

COPY package*.json .env.example /service/
COPY ./server /service/server

RUN npm install --production --verbose

ENV stage=run-in-container

EXPOSE 3000

CMD ["npm", "start"]

