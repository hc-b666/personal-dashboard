FROM node:18-alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8989

CMD [ "npm", "start" ]
