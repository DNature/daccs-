FROM node:alpine
WORKDIR /app
COPY . . 
RUN npm install -g yarn --force 
RUN	yarn install
RUN chmod +x /app/start.sh
RUN cat /app/start.sh

RUN yarn prisma generate

EXPOSE 4000
CMD ["/bin/sh", "-c", "sleep 20 && /app/start.sh"]