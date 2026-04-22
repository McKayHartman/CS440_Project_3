FROM node:20

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install && npm rebuild sqlite3 --build-from-source

COPY . .

EXPOSE 5001

CMD ["node", "app.js"]