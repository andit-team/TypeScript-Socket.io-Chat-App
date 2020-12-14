/**
 * This Is Only For Responder----------------------------
 * @param {response} res 
 * @param {status Code} code 
 * @param {Send Data} json
 */
import { Response } from 'express'
export class Responder {
    constructor(res: Response, code: number, json: any){
        return res.status(code).json(json)
    }
}