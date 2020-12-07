import { Router } from "express"
import { UserController } from '../../controllers/user.controller'
import {adminAuth} from '../../auth/auth'

export class UserRoute {

    public router: Router
    public userController: UserController = new UserController()

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.post("/signup", this.userController.registerUser)
        this.router.post("/login", this.userController.loginUser)
        this.router.put("/update", adminAuth, this.userController.changeUser)
    }
}