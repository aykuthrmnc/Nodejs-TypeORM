import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserModel } from "./User";

@Entity({ name: "Role" })
export class RoleModel {
  @PrimaryGeneratedColumn("uuid")
  Id: string;

  @Column()
  Name: string;

  @OneToMany((type) => UserModel, (user) => user.role)
  users: UserModel[];
}
