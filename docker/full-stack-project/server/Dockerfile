FROM node:20.12.1

WORKDIR /

COPY package.json ./
COPY index.js ./

RUN npm install


EXPOSE 3000

CMD [ "node", "index.js" ]