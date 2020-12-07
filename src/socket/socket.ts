import { Server } from "socket.io"
import {MessageController} from './message/message'
export class SocketFunction {
    public socket(io: Server) {
        io.on('connection', socket => { 
            
            socket.on('send-message', (data: {reciver: string, sender: string, message: string}) => {
                let messageReply = new MessageController().sendMessage(data.reciver, data.sender, data.message)
                messageReply.then( result => {
                    io.to(data.reciver).emit('send-message-reply',result)
                })
            })
            socket.on('get-all-message', (data: {reciver: string, sender: string}) => {
                let messages = new MessageController().getAllMessage(data.reciver, data.sender)
                messages.then( result => {
                    socket.emit('get-all-message-reply',result)
                })
            })

        })
        
    }
}