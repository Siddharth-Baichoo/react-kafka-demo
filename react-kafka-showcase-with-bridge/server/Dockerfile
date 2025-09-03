# Simple Node bridge image
FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production || (echo "No lockfile, continuing" && npm install --production)

COPY server.js ./

EXPOSE 4000

ENV PORT=4000

CMD ["node", "server.js"]
