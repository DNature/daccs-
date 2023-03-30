#! /bin/bash

# build web app
cd ./app && yarn install && yarn build && cd ../

# give server permission
chmod +x ./server/start.sh && docker build ./server/

# start app
docker-compose up
