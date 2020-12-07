import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { User } from "../models/user.model"
import { JWT_SECRET } from "../util/secrets"
import {Responder} from '../responder/responder'

export class UserController {

  public registerUser(req: Request, res: Response){
    const hashedPassword = bcrypt.hashSync(req.body.password, 8)

    User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    }).then(result => {

        if(result){

            const token = jwt.sign({ _id: result._id }, JWT_SECRET!)
            let data = {
                token: token,
                error: false,
                msg: "User Creation Successful",
                data : result
            }
            new Responder(res,200,data)

        }else{

            let data = {
                error: true,
                msg: "User Creation UnSuccessful",
            }
            new Responder(res,200,data)

        }
    }).catch(error => {

        let data = {
            error: true,
            msg: "User Creation UnSuccessful",
        }
        new Responder(res,200,data)

    })
  }

  public loginUser(req: Request, res: Response){
    let fetchAdmin: any
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if(!user){
                const data = {
                    error: true,
                    msg: "User Not Found"
                }
                new Responder(res, 200, data)
            }
            fetchAdmin = user 
            return bcrypt.compare(req.body.password, user!.password) 
        })
        .then(result => {
            if(!result){
                const data = {
                    error: true,
                    msg: "Password Not Matched"
                }
                new Responder(res, 200, data)
            }
            const token = jwt.sign({_id: fetchAdmin._id}, JWT_SECRET!, {
                expiresIn: "8h"
            }) 
            const data = {
                token: token,
                msg: "Successfully Log in User",
                error:false
            }
            new Responder(res, 200, data)
        })
        .catch((err) => {
            const data = {
                error: true,
                msg: "User Log in Unsuccessful"
            }
            new Responder(res, 200, data)
        }) 
  }

  public changeUser(req: Request, res: Response){
      
      User.updateOne({_id: res.locals.user._id},{username: req.body.username}).then((user: { n: number }) => {
          if(user.n > 0){
            const data = {
                msg: "Successfully Update UserName",
                error:false
            }
            new Responder(res, 200, data)
          }else{
            const data = {
                msg: "Problem in Updating UserName",
                error:true
            }
            new Responder(res, 200, data)
          }
      }).catch(() => {
        const data = {
            msg: "Problem in Updating UserName",
            error:true
        }
        new Responder(res, 200, data)
      })
  }

}