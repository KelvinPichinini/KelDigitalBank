FROM node:16-alpine

USER node

WORKDIR /app-front

COPY package.json ./

RUN npm install --silent

COPY . .

# CMD [ "npm", "run", "dev"]

ENTRYPOINT [ "npm", "start" ]
