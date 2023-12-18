FROM node:16.0.0

# WORKDIR /usr/src/app.json ./
# COPY package*.json ./*
# RUN npm install
# COPY . .
# EXPOSE 4441
# CMD [ "node", "index.js" ]
RUN mkdir -p /src/app
WORKDIR /src/app

# Install app dependencies
COPY package.json /src/app
RUN npm install

COPY . .
EXPOSE 2013
CMD [ "node", "index.js" ]