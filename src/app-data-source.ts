import { RoleModel } from "./entity/Role";
import { DataSource } from "typeorm";
import { UserModel } from "./entity/User";

const AppDataSource = new DataSource({
  type: "mssql",
  host: "AYKUT",
  port: 1435,
  username: "aykut",
  password: "18121997",
  extra: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
  database: "TypeORM",
  synchronize: true,
  logging: true,
  entities: [UserModel, RoleModel],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
