import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: "Product" })
export class Product {
  @PrimaryGeneratedColumn("increment", { name: "Id" })
  id: number;

  @Column({ name: "Name" })
  name: string;

  @Column({ name: "Price" })
  price: number;

  @Column({ name: "Description", nullable: true })
  description: string;

  @Column({ name: "CategoryId" })
  categoryId: number;
}
