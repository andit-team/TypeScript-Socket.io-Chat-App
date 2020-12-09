import { NextFunction, Request, Response } from "express"
import { Message } from "../models/message.model"
import {Responder} from '../responder/responder'

export class MessageController {

  public sendMessage( req: Request, res: Response){
    Message.create({
      message: req.body.message,
      reciver: req.body.reciver,
      sender: res.locals.user._id
    }).then( result => {
      let data = {
        error: false,
        msg: "Message sent successfully",
        data : result
    }
    req.io.to(req.body.reciver).emit('message-recieve', data)
    new Responder(res,200,data)
    }).catch(error => {
      let data = {
        error: true,
        msg: "Messge send Unsuccessful",
    }
    new Responder(res,200,data)
    })
  }

  public getAllMessage(req: Request, res: Response){
      Message.find({
          $or: [
              {
                  sender: res.locals.user._id
              },
              {
                reciver: res.locals.user_id
              }
          ]
      }).then( result => {
          if(result.length > 0){
            let data = {
                error: false,
                msg: "Message Get successfully",
                data : result
            }
            new Responder(res,200,data)
          }else{
            let data = {
                error: true,
                msg: "Messge Get Unsuccessful",
            }
            new Responder(res,200,data)
          }
      }).catch( () => {
        let data = {
            error: true,
            msg: "Messge Get Unsuccessful",
        }
        new Responder(res,200,data)
      })
  }

}