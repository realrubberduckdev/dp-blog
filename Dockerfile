FROM node:16.14 AS builder
WORKDIR /dpblog
RUN npm i -g gatsby-cli
COPY package*.json ./
RUN yarn install
COPY . .
RUN gatsby build

FROM gatsbyjs/gatsby:latest
COPY --from=builder /dpblog/public/ /pub