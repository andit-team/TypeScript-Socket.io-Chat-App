import { Server } from "socket.io"
import {MessageController} from './message/message'
export class SocketFunction {
    public socket(io: Server) {
        io.on('connection', socket => { 

            let userId = socket.userId
            socket.join(userId)
            console.log("Connected: " + userId)

            socket.on("disconnect", () => {
                socket.leave(userId)
                console.log("Disconnected: " + socket.userId)
            })
            socket.on('send-message', (data: {reciver: string, message: string}) => {
                let messageReply = new MessageController().sendMessage(data.reciver, userId, data.message)
                messageReply.then( result => {
                    io.to(data.reciver).emit('send-message-reply',result)
                })
            })
        })
        
    }
}