FROM node:alpine

# Create app directory
WORKDIR /usr/src/file_upload

# Install app dependencies
COPY package.json .

RUN npm install

# Bundle app source
COPY . .

VOLUME /usr/src/file_upload/uploads
EXPOSE 3100
CMD [ "npm", "start" ]