import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./router/*.ts"];

swaggerAutogen(outputFile, endpointsFiles);