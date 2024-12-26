FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY ./prisma prisma
COPY .env ./
COPY ./src ./src

EXPOSE 5000

CMD ["npm", "run", "dev"]