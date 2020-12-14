import { Server } from 'socket.io'
export class SocketFunction {
    public socket(io: Server) {
        io.on('connection', socket => { 

            let userId = socket.userId.toString()
            socket.join(userId)
            console.log('Connected: ' + userId)

            socket.on('disconnect', () => {
                socket.leave(userId)
                console.log('Disconnected: ' + socket.userId)
            })
        })
        
    }
}