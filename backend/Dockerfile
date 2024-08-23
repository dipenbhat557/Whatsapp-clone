FROM maven:3.8.5-openjdk-17-slim as build
WORKDIR /backend
COPY . .
RUN mvn install -DskipTests

FROM openjdk:17-slim 
COPY --from=build /backend/target/*jar /backend/backend.jar
EXPOSE 8080
CMD ["java","-jar","/backend/backend.jar"]