import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Message from "./Message";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar", length:100})
  name!: string;

  @Column({type:"varchar", length: 150})
  email!: string;

  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[]; 
}

export default User;
