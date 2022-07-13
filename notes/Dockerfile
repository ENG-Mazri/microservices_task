FROM node:17-alpine

WORKDIR /notes

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]