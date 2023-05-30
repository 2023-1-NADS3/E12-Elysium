FROM node:18

WORKDIR /ElysiumFront

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]