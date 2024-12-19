import express,{Request, Response} from 'express';
import { AppDataSource } from '../index';
import Message from '../entity/Message';
import User from '../entity/User';


const router = express.Router();

router.post('/messages', async (req: Request, res: Response) => {
const {userId, content} = req.body;

try {
  const userRepository = AppDataSource.getMongoRepository(User);
  const user = await userRepository.findOneBy({id: userId});
  if (!user) {

       return res.status(404).json({error: 'Usuario no encontrado'});
 }
  
 const messageRepository = AppDataSource.getRepository(Message);
 const userMessage = messageRepository.create({
       content,
       isBot: false,
       user
 });
 await messageRepository.save(userMessage);

 const botResponse =  await generateResponse(content);

 const botMessage = messageRepository.create({
       content: botResponse,
       isBot: true,
       user:{id:userId}
 });

 await messageRepository.save(botMessage);

 res.status(200).json({
       userMessage,
       botMessage
 })
}catch(error) {
 console.error("Error en el chat:", error);
 res.status(500).json({message: "Error en el chat", error})
}

})