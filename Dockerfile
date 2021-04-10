FROM node:15.14.0 AS builder
WORKDIR /dpblog
RUN npm i -g gatsby-cli
COPY package*.json ./
RUN npm install
COPY . .
RUN gatsby build

FROM gatsbyjs/gatsby:latest
COPY --from=builder /dpblog/public/ /pub