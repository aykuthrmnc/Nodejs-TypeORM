import { version } from "./package.json";
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./src/swagger_output.json";
const endpointsFiles = ["./src/index.ts"]; //, "./src/entity/User.ts"

const options = {
  info: {
    title: "Nodejs with TypeORM",
    description: "My API documentation",
    contact: {
      name: "Aykut Harmancı",
    },
    license: {
      name: "Aykut Harmancı",
      url: "https://instagram.com/aykuthrmnc",
    },
    version,
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "local server",
    },
    {
      url: "http://localhost:5000/",
      description: "the other server",
    },
  ],
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "User endpoint",
    },
    {
      name: "Auth",
    },
  ],
  securityDefinitions: {
    // bearerAuth: {
    //   type: "http",
    //   scheme: "bearer",
    //   bearerFormat: "JWT",
    // },
    // apiKeyAuth: {
    //   type: "apiKey",
    //   in: "header", // can be "header", "query" or "cookie"
    //   name: "X-API-KEY", // name of the header, query parameter or cookie
    //   description: "any description...",
    // },
    api_key: {
      type: "apiKey",
      in: "header",
      // in: "cookie",
      name: "Authorization",
    },
  },
  security: {
    api_key: [],
  },
  definitions: {
    Login: {
      username: "",
      password: "",
    },
    User: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
    },
    CreateUser: {
      $ref: "#/definitions/User",
    },
    UpdateUser: {
      $ref: "#/definitions/User",
    },
  },
  components: {
    examples: {
      User1: {
        value: {
          username: "aykuthrmnc",
          password: "123456",
        },
        summary: "Ana hesap",
      },
      User2: {
        value: {
          username: "aykuthrmncc",
          password: "123456",
        },
        summary: "Yan hesap",
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, options);

// .then(() => {
//   import("./src/index"); // Your project's root file
// });
