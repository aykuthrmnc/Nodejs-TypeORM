import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserModel } from "./User";

@Entity({ name: "Role" })
export class RoleModel {
  @PrimaryGeneratedColumn("uuid", { name: "Id" })
  id: string;

  @Column({ name: "Name" })
  name: string;

  @OneToMany((type) => UserModel, (user) => user.role)
  users: UserModel[];
}
