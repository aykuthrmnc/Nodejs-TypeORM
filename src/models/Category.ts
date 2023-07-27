import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: "Category" })
export class Category {
  @PrimaryGeneratedColumn("increment", { name: "Id" })
  id: number;

  @Column({ name: "Name" })
  name: string;

  @Column({ name: "Description", nullable: true })
  description?: string;

  @ManyToOne((type) => Category, (category) => category.children)
  parent: Category;

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[];
}
