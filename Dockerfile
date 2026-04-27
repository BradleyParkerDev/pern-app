FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:24-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/app/server/dist ./app/server/dist
COPY --from=builder /app/app/client/dist ./app/client/dist
COPY --from=builder /app/app/client/public ./app/client/public
COPY --from=builder /app/openapi.json ./openapi.json

EXPOSE 3001

CMD ["node", "app/server/dist/server/src/bin/www.js"]