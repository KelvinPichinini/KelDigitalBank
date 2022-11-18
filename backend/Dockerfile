FROM node:16-alpine

USER node

WORKDIR /app-back

COPY package.json ./

RUN npm install --silent

COPY . .

# CMD [ "npm", "run", "dev"]

ENTRYPOINT [ "npm", "start" ]
