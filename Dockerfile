FROM node:14 as base
WORKDIR /usr
COPY package.json ./
COPY babel.config.js ./
COPY src ./src
RUN ls -a
RUN yarn
RUN yarn build

COPY . .