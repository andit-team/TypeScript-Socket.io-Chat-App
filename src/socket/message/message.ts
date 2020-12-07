import {decryptJWT} from "../../auth/auth"
import { Message } from "../../models/message.model"

export class MessageController {
    
    public async sendMessage(reciver: string, sender: string, message: string){

        let data= decryptJWT(sender)
        if(data.error){
            let data = {
                error: true,
                msg: "Token Not Valid",
                data: {}
            }
            return data
        }
        let decoded: any = data.decoderToken

        let result = await Message.create({
            message: message,
            reciver: reciver,
            sender: decoded._id
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

  public async getAllMessage(reciver: string, sender: string){

    let data= decryptJWT(sender)
        if(data.error){
            let data = {
                error: true,
                msg: "Token Not Valid",
                data: {}
            }
            return data
        }
        let decoded: any = data.decoderToken

    let result = await Message.find({
      reciver: reciver,
      sender: decoded._id
    }).populate('reciver').populate('sender')
    let returndata = {
        error: false,
        msg: "Message Get Successful",
        data: result
    }
    return returndata
  }

}