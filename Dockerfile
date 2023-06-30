FROM node:19-alpine AS build
WORKDIR /usr/src/app/ui
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/tc-book-store-ui /usr/share/nginx/html
