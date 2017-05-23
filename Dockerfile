FROM node:7.8.0

ENV NPM_CONFIG_LOGLEVEL warn

COPY . .

RUN yarn

# build frontend
RUN yarn build

CMD yarn start