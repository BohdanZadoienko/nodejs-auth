// Swagger Configuration

export const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "REST API for users",
      version: "1.0.0",
      description: "A simple API documentation",
    },

    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/router/*.ts"],
};
