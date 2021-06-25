FROM node@sha256:8263de4a04679fabfdbda4e3a18de44d303ec5ba4dd3dafaf5fdc69af7164fd6

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