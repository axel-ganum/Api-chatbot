import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import User from "./User";

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type:"text"})
  content!: string;

  @Column({type: 'boolean', default:false})
  isBot!: boolean;

  @ManyToOne(() => User, (user) => user.messages)
  user!: User; 
}
export default Message;