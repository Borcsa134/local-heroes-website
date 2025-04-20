FROM node:22-alpine3.20

RUN apk update && apk upgrade
RUN apk add chromium vim git

ENV CHROME_BIN=/usr/bin/chromium-browser

RUN mkdir -p /usr/src/app/
COPY ./ ./usr/src/app/
WORKDIR /usr/src/app/

