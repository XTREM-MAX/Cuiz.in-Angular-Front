FROM node:14.2-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

### STAGE 2: Run ###
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
COPY --from=build /app/dist/Cuiz.in-Angular-Front /app