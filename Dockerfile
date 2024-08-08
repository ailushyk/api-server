FROM node:22-alpine as base

WORKDIR /usr/src/app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

# Step 8: Define the command to run your app
CMD ["node", "dist/server.js"]