FROM node:22-alpine as base

WORKDIR /usr/src/app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 3003

# Step 8: Define the command to run your app
#CMD ["node", "--experimental-strip-types", "--env-file=.env",  "./src/index.ts"]
CMD ["node", "--experimental-strip-types",  "./src/index.ts"]
