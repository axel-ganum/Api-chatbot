import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Message from "./Message";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar", length:100})
  name!: string;

  @Column({type:"varchar", length: 150,  unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[]; 
}

export default User;
