FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json ./

COPY . .

USER node

RUN yarn install --pure-lockfile

EXPOSE 3000

CMD ["npm" , "run", "dev"]