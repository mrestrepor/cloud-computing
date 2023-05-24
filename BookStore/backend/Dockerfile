# Base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose port (if your server listens on a specific port)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
