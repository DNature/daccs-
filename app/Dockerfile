FROM node:alpine
WORKDIR /app
COPY ./dist ./dist
RUN npm install -g serve
RUN ls -al

EXPOSE 4000
CMD ["/bin/sh", "-c", "sleep 20 && serve dist"]