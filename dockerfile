FROM node

WORKDIR /pmcommerce70435

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]
