FROM node

USER node

WORKDIR /home/node/

COPY package*.json ./

RUN mkdir ./scripts/

COPY ./scripts/preinstall.sh ./scripts/

COPY --chown=node:node ./ ./

RUN npm install --only=prod

EXPOSE 6080
EXPOSE 6443

CMD ["npm", "run", "start"]