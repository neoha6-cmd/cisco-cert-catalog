FROM node:22-alpine

WORKDIR /app

# Update npm itself first — it bundles its own tar dependency,
# and older npm versions ship a vulnerable one regardless of our
# own package.json.
RUN npm install -g npm@latest

COPY package*.json ./
RUN npm install --production

COPY . .

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
