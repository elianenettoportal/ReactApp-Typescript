# We don't want to start from scratch.
# That is why we tell node here to use the current node image as base.
FROM node:18-slim as base2

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY frontend_reactapp/package*.json ./

# Install node packages
RUN npm install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY frontend_reactapp/ .

# Build the app
RUN npm run build

# Expose $PORT on container.
# We use a varibale here as the port is something that can differ on the environment.
EXPOSE 3005

# Set host to localhost / the docker image
ENV NUXT_HOST=0.0.0.0

# Set app port
ENV NUXT_PORT=3005


# Start the app
CMD [ "npm", "start" ]