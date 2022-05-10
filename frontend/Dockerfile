FROM node:18

ARG BUILD_CONTEXT

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .



CMD ["npm", "start"]