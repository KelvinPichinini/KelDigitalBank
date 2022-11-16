FROM node:16-alpine

WORKDIR /app-back

COPY package.json ./

RUN npm install --silent

COPY . .

CMD [ "npm", "start"]