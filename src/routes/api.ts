import { Router } from "express"
import { UserRoute } from "./api/user.route"


export class Api {

    public router: Router
    public userRoute: UserRoute = new UserRoute()

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.use("/user", this.userRoute.router)
    }
}