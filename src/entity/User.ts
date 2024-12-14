import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Message from "./Message";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[]; 
}

export default User;
