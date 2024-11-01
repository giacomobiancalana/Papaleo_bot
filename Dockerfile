FROM node:18.16.0-alpine as base

RUN npm i -g npm@9.5.1
RUN npm i -g typescript@5.6.3 pm2
# TODO: rsync (da installare e vedi sito che ne parla (vedi preferiti su chrome)), pm2 (versione??), e
# tsc-typescript (tsc è deprecato credo, ora c'è typescript sopltanto)

WORKDIR /app
COPY ./tsconfig.json ./
COPY ./package*.json ./
RUN npm ci
COPY ./src ./src
COPY /.env ./
RUN tsc

#END BASE

# TODO: i o il FROM ???
# 1 warning found (use docker --debug to expand):
#  - FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 1)

# ENTRYPOINT ["sh", "docker-entrypoint.sh"]

CMD ["pm2-runtime", "/app/dist/index.js"]

# DOCKER RUN COL DOCKER BUILD
# docker build --tag prova-papaleo . && docker run -d --name papaleo-container -p 3000:3000 prova-papaleo
