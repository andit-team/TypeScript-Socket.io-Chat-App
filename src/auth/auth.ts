/**
 * Auth-----------------------
 */
import * as jwt from "jsonwebtoken"
import {Responder} from '../responder/responder'
import { NextFunction, Request, Response } from "express"
import {JWT_SECRET} from '../util/secrets'

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
        try{

            const token = req.headers.authorization!.split(" ")[1] 
            
            let decodedToken = jwt.verify(
                token,
                JWT_SECRET!
            ) 
            res.locals.user = decodedToken
            next()
    
        }catch (err) {
            const data = {
                msg: "You are not authenticated",
                error:true
            }
            new Responder(res, 200, data)
            next()
        }
}

export const decryptJWT = (token: string) => {
    try{
        let decodedToken = jwt.verify(
            token,
            JWT_SECRET!
        ) 
        const data = {
            error: false,
            decoderToken: decodedToken
        }
        return data

    }catch (err) {
        const data = {
            error: true,
            decoderToken: {}
        }
        return data
    }
}