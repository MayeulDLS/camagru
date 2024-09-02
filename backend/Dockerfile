# Base Image
FROM node:18

WORKDIR /app
# install dependencies
COPY ./package*.json ./
RUN npm install
COPY . .

EXPOSE 5038

# Default command
CMD ["npm", "start"]

