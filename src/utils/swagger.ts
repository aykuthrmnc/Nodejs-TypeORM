import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import swaggerOutput from "../swagger_output.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
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
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
    tags: [
      {
        name: "User",
        description: "User endpoint",
      },
    ],
    components: {
      schemas: {
        CreateUser: {
          type: "object",
          required: ["firstname", "lastname", "username", "password", "email", "phonenumber"],
          properties: {
            firstname: {
              type: "string",
              required: true,
              default: "Aykut",
            },
            lastname: {
              type: "string",
              required: true,
              default: "Harmancı",
            },
            username: {
              type: "string",
              required: true,
              default: "aykuthrmnc",
            },
            password: {
              type: "string",
              required: true,
              default: "123456",
            },
            email: {
              type: "string",
              required: true,
              default: "aykuthrmnc@gmail.com",
            },
            phonenumber: {
              type: "string",
              required: true,
              default: "123456",
            },
          },
        },
      },
      securitySchemas: {
        api_key: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      security: {
        api_key: [],
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app: Express, port: number) => {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput)); // swaggerSpec
  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Swagger dökümanı http://localhost:3000/docs adresinde bulunmaktadır.`);
};

export default swaggerDocs;
