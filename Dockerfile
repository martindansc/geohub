FROM node:14

WORKDIR /usr/src/app

EXPOSE 3000

CMD ["yarn", "start"]