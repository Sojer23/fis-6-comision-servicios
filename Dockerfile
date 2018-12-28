FROM node:10.14-stretch-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY index.js .
COPY srcApi srcApi
# COPY srcApi/models/comisiones.js srcApi/models/
# COPY srcApi/models/apikeys.js srcApi/models/
# COPY srcApi/server.js srcApi/
COPY dist dist

#RUN ng build --prod
ENV NODE_ENV=production

EXPOSE 3000
CMD npm start