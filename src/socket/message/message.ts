import { Message } from "../../models/message.model"
export class MessageController {
    
    public async sendMessage(reciver: string, sender: string, message: string){

        let result = await Message.create({
            message: message,
            reciver: reciver,
            sender: sender
        })

        if(result){
            let data = {
                error: false,
                msg: "Message Send Successful",
                data: result
            }
            return data
        }else{
            let data = {
                error: true,
                msg: "Message send UnSuccessful",
                data: {}
            }
            return data
        }
    }
}