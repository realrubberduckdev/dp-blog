FROM node:carbon-stretch AS builder
WORKDIR /dpblog
RUN npm i -g gatsby-cli
RUN gatsby --version

COPY package*.json ./
RUN npm install
COPY . .
RUN gatsby build

FROM gatsbyjs/gatsby:latest
COPY --from=builder /dpblog/public/ /pub