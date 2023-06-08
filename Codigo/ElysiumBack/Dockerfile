FROM node:18

WORKDIR /ElysiumBack

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
