FROM node:18

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY frontend/package.json frontend/

COPY backend/package.json backend/

# TODO: just move required dev dependencies instead
# TODO: also change and test heroku script
# TODOL configure env variables
RUN yarn --production=false --no-lockfile

COPY frontend frontend/

COPY backend backend/

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]
