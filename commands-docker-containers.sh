#!/bin/bash
docker run --rm -it -w /app -v $(pwd):/app node:18.16.0-alpine npm ci
docker run --rm -it -w /app -v $(pwd):/app node:18.16.0-alpine npx tsc
# se non funzionano, metti la parte di "-w ..." dopo la parte di "-v ..."

# vedi questo video short (vedi anche il file di comandi verso la fine):
# https://www.youtube.com/watch?v=gDKnU4LQDS4


# Così mappo solo la cartella node_modules e i due file package*.json
mkdir -p node_modules
docker run --rm -it -w /app \
  -v $(pwd)/package.json:/app/package.json \
  -v $(pwd)/package-lock.json:/app/package-lock.json \
  -v $(pwd)/node_modules:/app/node_modules \
  node:18.16.0-alpine npm ci


# Esegue lo script "dev" con anche l'esposizione delle porte
docker run --rm -it -w /app -v $(pwd):/app -p 3000:3000 node:18.16.0-alpine npm run dev
