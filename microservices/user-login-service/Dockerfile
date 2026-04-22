FROM node:20

# Install build dependencies for native modules like sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# Install dependencies and force a rebuild of sqlite3 from source 
# to avoid GLIBC compatibility issues.
RUN npm install && npm rebuild sqlite3 --build-from-source

COPY . .

EXPOSE 5002

CMD ["node", "app.js"]
