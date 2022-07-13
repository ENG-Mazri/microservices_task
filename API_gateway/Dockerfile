FROM node:17-alpine

WORKDIR /api_gateway

COPY . .

RUN npm install

EXPOSE 4444

CMD ["node", "server.js"]