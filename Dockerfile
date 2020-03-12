FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN yarn
RUN yarn global add pm2
RUN pm2 install pm2-logrotate
COPY . .
CMD ["yarn", "start"]
