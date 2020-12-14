import { Router } from 'express'
import { UserController } from '../../controllers/user.controller'
import { MessageController } from '../../controllers/message.controller'
import {Auth} from '../../auth/auth'

export class UserRoute {

    public router: Router
    public userController: UserController = new UserController()
    public messageController: MessageController = new MessageController()
    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.post('/signup', this.userController.registerUser)
        this.router.post('/login', this.userController.loginUser)
        this.router.put('/update', Auth, this.userController.changeUser)
        this.router.post('/verify-user', this.userController.verifyUsr)
        this.router.get('/get-all-user', this.userController.getAllUser)

        this.router.get('/messages', Auth, this.messageController.getAllMessage)
        this.router.post('/message', Auth, this.messageController.sendMessage)
    }
}