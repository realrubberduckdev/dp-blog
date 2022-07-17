# This is closest to what happens in github workflow. So useful for local checks
# Check LocalDockerTest.ps1 to run and verify

FROM node:16.14 AS builder
WORKDIR /dpblog
RUN npm i -g gatsby-cli
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --immutable --immutable-cache --check-cache
COPY . .
RUN gatsby build

FROM gatsbyjs/gatsby:latest
COPY --from=builder /dpblog/public/ /pub