import { Server } from "socket.io"
export class SocketFunction {
    public socket(io: Server) {
        io.on('connection', socket => { 
            console.log("Socket connected--------------")
        })
        
    }
}