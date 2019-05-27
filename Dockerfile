FROM node:8

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

ARG PORT=8080
ENV PORT=${PORT}

ARG MONGO_URL=mongodb://db:27017
ENV MONGO_URL=${MONGO_URL}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:prod"]
