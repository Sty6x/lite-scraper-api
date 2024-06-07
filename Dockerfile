# Use an official Node.js runtime as the base image
FROM node:20-bookworm

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
# Installing playwright and other browsers
RUN npm install
RUN npx playwright install --with-deps
# Updating playwright
RUN npm install -g nodemon
RUN npm install -g typescript 
RUN npx playwright install 

# Copy the rest of the application code to the working directory
COPY . .

# build project
RUN npm run build 

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["nodemon", "./dist/main.js"]

