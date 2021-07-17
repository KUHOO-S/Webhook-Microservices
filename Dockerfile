FROM node:16-alpine3.11

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN npm install --production

COPY . .

CMD ["node", "index.js"]