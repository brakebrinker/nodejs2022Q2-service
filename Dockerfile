FROM node:16.15.1-alpine3.15

WORKDIR /app

COPY . .
# install all dependecies production & development to allow build
RUN npm install

CMD npm run start:dev