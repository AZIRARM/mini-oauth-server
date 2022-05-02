From node:18-alpine3.14

RUN echo "Update image"
RUN apk update

RUN echo "Install curl"
RUN apk add curl

RUN mkdir -p /app
RUN mkdir -p /app/clients
RUN mkdir -p /app/pages

COPY package.json /app
COPY server.js /app
COPY clients/users-api.js /app/clients

ADD pages /app/pages


COPY entrypoint.sh /

RUN chmod +x /entrypoint.sh

WORKDIR /app

RUN npm install

EXPOSE 9000

ENTRYPOINT [ "/entrypoint.sh" ]
