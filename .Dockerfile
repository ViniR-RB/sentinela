FROM node:20.6.1

WORKDIR /usr/src/app


COPY package*.json ./


COPY .env ./

RUN npm install

COPY . .



RUN npm run build



EXPOSE 3000


CMD [ "npm", "run", "start:debug" ]