import { RoleModel } from "./models/Role";
import { DataSource } from "typeorm";
import { UserModel } from "./models/User";
import { Category } from "./models/Category";
import { Product } from "./models/Product";

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
  entities: [UserModel, RoleModel, Category, Product],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
