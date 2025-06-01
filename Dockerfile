# install nodejs
FROM node:20-alpine

#create working directory
WORKDIR /app

# install dependency
COPY package*.json ./
RUN npm  install

# copy the source to our image
COPY . .

# build typescript code
RUN npm run build

# expose app port
EXPOSE 3000

# run app
CMD [ "npm","start" ]