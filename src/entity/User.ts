import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { RoleModel } from "./Role";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the user
 *         firstName:
 *           type: string
 *           description: Name of the user
 *         lastName:
 *           type: string
 *           description: Surname of the user
 *         email:
 *           type: string
 *           description: Email of the user
 */

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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
