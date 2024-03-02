# Stage 1: Build the application
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY client ./client
COPY backend ./backend
RUN mvn clean package

# Stage 2: Run the application
FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/backend/target/backend-0.0.1-SNAPSHOT.jar ./demo-aws.jar
EXPOSE 9000
CMD ["java", "-Dspring.profiles.active=prod", "-jar", "demo-aws.jar"]