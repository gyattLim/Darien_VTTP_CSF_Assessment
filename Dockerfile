#Creating environment for angular
FROM node:21 AS ng-builder
WORKDIR /ngapp 

#Install Angular
RUN npm i -g @angular/cli

COPY client/package*.json .
# COPY frontend/package-lock.json .
COPY client/angular.json .
COPY client/tsconfig.* .
COPY client/src src

#Installing node_modules from looking at package-lock.json, else "npm i" would install all the modules based on package.json which is the latest package which we do not wish to have that as it changes everytime
#ng build would only run if npm ci ran
RUN npm ci && ng build

# /ngapp/dist/frontend/browser/*
#Starting with this linux server
FROM maven:3-eclipse-temurin-21 AS sb-builder 

#Create a directory call/app
#Create a directory call/sbapp
#go into the directory cd/app

WORKDIR /sbapp

#Everything after this is in /app
# "." at the back adds everything from the current directory to the WORKDIR with the exact name
COPY server/mvnw .
COPY server/mvnw.cmd .
COPY server/pom.xml .

COPY server/.mvn .mvn
COPY server/src src


#Build the application
RUN mvn package -Dmaven.test.skip=true


FROM maven:3-eclipse-temurin-21

WORKDIR /app

COPY --from=sb-builder /sbapp/target/backend-lecture-0.0.1-SNAPSHOT.jar /app/target

##Run the application

#Define environment variables
ENV PORT=8080

# ENV SPRING_REDIS_HOST=localhost
# ENV SPRING_REDIS_PORT=6379
# ENV SPRING_REDIS_USERNAME=NOT_SET
# ENV SPRING_REDIS_PASSWORD=NOT_SET

ENV SPRING_DATA_MONGODB_URI= 

ENV SPRING_DATASOURCE_URL=
ENV SPRING_DATASOURCE_USERNAME=
ENV SPRING_DATASOURCE_PASSWORD=

            
# Expose the port so that it could be run on this port on your local computer when calling docker container run -d -p (8080):3050, as PORT in the environment variable is only an object, it must be referenced
EXPOSE ${PORT} 

#Run the program
# By doing SERVER_PORT = ${PORT} it changes the application port "server.port" in the application.properties to the exposed port number, so when we run the container, it would be 8080:8080(application port) rather than 8080:3050
ENTRYPOINT SERVER_PORT=${PORT} java -jar target/backend-lecture-0.0.1-SNAPSHOT.jar

#docker build -t darcodelim/ssf-day14:v1.0.0 .
#dive darcodelim/ssf-day14:v1.0.0