FROM node:18

WORKDIR /ElysiumFront

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]
