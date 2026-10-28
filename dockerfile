

#
#  from version 48
#  reminder: make budgets 4MB in the tsconfigs if you are doing angular only


# docker build -t a500insurance:oct25a . 

# docker run -tp 8080:80 a500insurance: oct25a

# Stage 1: Build Stage
FROM node:lts-alpine as build-stage
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json for dependency installation
 COPY package*.json .  
#
#
COPY . . 
# 
# Install dependencies
RUN npm install 
RUN npm run build
# Stage 2: Production Stage
FROM nginx:stable-alpine as production-stage
# Copy the built files from the build stage to NGINX's default directory
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Expose port 80 for the application
EXPOSE 80
# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]