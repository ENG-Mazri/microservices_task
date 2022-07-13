FROM node:17-alpine

WORKDIR /emails

COPY . .

RUN npm install

EXPOSE 6666

CMD ["node", "index.js"]