ARG NODE_VERSION=21.2.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY public /app/public
COPY src /app/src
COPY package.json /app

RUN npm install
RUN npm install -g serve

# Copy the rest of the source files into the image.
COPY . /app

# Expose the port that the application listens on.
EXPOSE 3000

RUN npm run build

ENTRYPOINT ["serve", "-s", "build"]

