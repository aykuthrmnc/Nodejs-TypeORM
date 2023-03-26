import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { RoleModel } from "./Role";

@Entity({ name: "User" })
export class UserModel {
  @PrimaryGeneratedColumn("uuid")
  Id: string;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column({ unique: true })
  Username: string;

  @Column()
  Password: string;

  @Column({ unique: true })
  Email: string;

  @Column({ unique: true })
  PhoneNumber: string;

  @ManyToOne((type) => RoleModel, (role) => role.users)
  @JoinColumn({ name: "role" })
  role: RoleModel;
}