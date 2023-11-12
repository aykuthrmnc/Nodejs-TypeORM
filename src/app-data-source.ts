import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "aykuthrmnc",
  password: "18121997",
  database: "TypeORM",
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
