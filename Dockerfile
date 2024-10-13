# Dockerfile per app telegram papaleo

# esiste?
FROM node:18.16.0-alpine as base

RUN npm i -g npm@9.5.1
RUN npm i -g typescript pm2

WORKDIR /app
COPY ./tsconfig.json ./
COPY ./package.json ./

#END BASE

WORKDIR /app

ENTRYPOINT ["sh", "docker-entrypoint.sh"]

CMD ["pm2-runtime", "/app/backend/dist/main.js"]
