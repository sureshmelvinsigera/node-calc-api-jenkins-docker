# Use an official Node.js runtime as a parent image
FROM node:lts-buster-slim

# Create and set the working directory
WORKDIR /home/node/app


# Adjust permissions to ensure the node user can write to it
USER root
RUN mkdir -p /home/node/app/.npm-cache && \
    chown -R node:node /home/node/app

# Switch to the node user provided by the Node.js image
USER node

# Set npm to use cache and log folders within the working directory to avoid permission issues
ENV NPM_CONFIG_CACHE=/home/node/app/.npm-cache
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_LOGPATH=/home/node/app/.npm-logs

# Create npm cache and log directories with correct permissions
RUN mkdir -p /home/node/app/.npm-cache /home/node/app/.npm-logs

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY --chown=node:node package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the app's source code from the host to the image filesystem
COPY --chown=node:node . .

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD ["node", "index.js"]
