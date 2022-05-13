FROM node:18

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY frontend/package.json frontend/

COPY backend/package.json backend/

RUN yarn --production=false --no-lockfile

COPY frontend frontend/

COPY backend backend/

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]
