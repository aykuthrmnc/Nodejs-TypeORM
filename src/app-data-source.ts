import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  extra: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
  synchronize: false, // AUTO MIGRATION
  logger: "file",
  logging: false, // LOG FILE
  entities: ["src/models/*.ts"], //[UserModel, RoleModel, Category, Product],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
