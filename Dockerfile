### STAGE 1:BUILD ###
FROM node:18-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /usr/src/app/ui
# Copy files to virtual directory
# COPY package.json package-lock.json ./
COPY package.json package-lock.json ./
COPY . .
RUN npm install
RUN npm run build

### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder 
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/ui/dist/tc-book-store-ui /usr/share/nginx/html
# Exposing a port, here it means that inside the container 
# the app will be using Port 80 while running
EXPOSE 80