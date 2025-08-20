# This is closest to what happens in github workflow. So useful for local checks
# Check LocalDockerTest.ps1 to run and verify

FROM node:20 AS builder
WORKDIR /dpblog
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --immutable --immutable-cache --check-cache
RUN npm i -g gatsby-cli@5.14.0
COPY . .
RUN yarn build

FROM gatsbyjs/gatsby:latest
COPY --from=builder /dpblog/public/ /pub