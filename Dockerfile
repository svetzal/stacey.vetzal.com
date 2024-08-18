#
# Docker build image - use this to see if it will work
#
from node:latest

RUN apt-get update && apt-get upgrade -y
RUN apt-get install autoconf libtool nasm

RUN mkdir /build
ADD . /build
WORKDIR /build

RUN yarn install

