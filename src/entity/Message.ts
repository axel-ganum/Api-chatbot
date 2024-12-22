import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import User from "./User";

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type:"text"})
  content!: string;

  @Column({type: 'boolean', default:false})
  isBot!: boolean;

  @ManyToOne(() => User, (user) => user.messages, {nullable:false})
  @JoinColumn({name:"userId"})
  user!: User; 
}
export default Message;