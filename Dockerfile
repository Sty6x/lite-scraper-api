# Use an official Node.js runtime as the base image
FROM node:20-bookworm

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
# Installing Ngrok for tunneling requests from ngrok servers to
# the local docker container.
ARG TUNNEL_KEY
RUN curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
  | tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
  && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
  | tee /etc/apt/sources.list.d/ngrok.list \
  && apt update \
  && apt install ngrok

RUN ngrok config add-authtoken ${TUNNEL_KEY}

# Copy the rest of the application code to the working directory
COPY . .

# Installing playwright and other browsers
RUN npm install
RUN npx playwright install --with-deps
# Updating playwright
RUN npm install -g nodemon
RUN npm install -g typescript
RUN npx playwright install


# build project
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD node "./dist/main.js" & ngrok http https://localhost:3000
