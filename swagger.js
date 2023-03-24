const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/swagger_output.json";
const endpointsFiles = ["./src/index.ts", "./src/entity/User.ts"];
const routePath = "./src/routes/*.ts";

swaggerAutogen(outputFile, endpointsFiles, routePath);
