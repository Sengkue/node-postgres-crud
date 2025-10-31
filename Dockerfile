# Use Node LTS
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install deps
COPY package.json package-lock.json* .npmrc* ./
RUN npm install --production --no-audit --no-fund && npm cache clean --force

# Bundle app source
COPY . .

# Expose port
EXPOSE 3008

# Set env
ENV NODE_ENV=production

# Start
CMD ["node", "server.js"]
