import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { RoleModel } from "./Role";

@Entity({ name: "User" })
export class UserModel {
  @PrimaryGeneratedColumn("uuid")
  Id: string;

  @Column({ name: "FirstName" })
  firstName: string;

  @Column({ name: "LastName" })
  lastName: string;

  @Column({ name: "Username", unique: true })
  username: string;

  @Column({ name: "Password" })
  password: string;

  @Column({ name: "Email", unique: true })
  email: string;

  @Column({ name: "PhoneNumber", unique: true })
  phoneNumber: string;

  @ManyToOne((type) => RoleModel, (role) => role.users)
  @JoinColumn({ name: "role" })
  role: RoleModel;
}
