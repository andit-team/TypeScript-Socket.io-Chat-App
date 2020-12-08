import dotEnv from 'dotenv'
dotEnv.config()
import express, { Application } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'
import { MONGODB_URI , PORT, JWT_SECRET } from './util/secrets'
import { Api } from './routes/api'
import { createServer } from "http"
import { Server } from "socket.io"
import {SocketFunction} from './socket/socket'
import * as jwt from "jsonwebtoken"
class App {
    public app: Application
    public httpServer: any
    constructor(){
        this.app = express()
        this.httpServer = createServer(this.app)
        this.config()
        this.routes()
        this.mongo()
        this.socket()
    }

    public routes(): void {
        this.app.use('/api', new Api().router)
    }

    public config(): void {
        //process.env.NODE_ENV = 'production'
        //Compress all routes
        this.app.use(compression()) 
        //User Helmet
        this.app.use(helmet()) 
        // Configure Express
        this.app.use(express.json()) 
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        ) 
        this.app.use('/uploads', express.static(path.join('uploads'))) 

        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*')  //* will allow from all cross domain
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            ) 
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') 
            next() 
        }) 

        this.app.use(cors()) 
    }

    private mongo() {
        const connection = mongoose.connection
        connection.on('connected', () => {
          console.log('Mongo Connection Established')
        })
        connection.on('reconnected', () => {
          console.log('Mongo Connection Reestablished')
        })
        connection.on('disconnected', () => {
          console.log('Mongo Connection Disconnected')
          console.log('Trying to reconnect to Mongo ...')
          setTimeout(() => {
            mongoose.connect(MONGODB_URI!, {
              autoReconnect: true, keepAlive: true,
              socketTimeoutMS: 3000, connectTimeoutMS: 3000
            })
          }, 3000)
        })
        connection.on('close', () => {
          console.log('Mongo Connection Closed')
        })
        connection.on('error', (error: Error) => {
          console.log('Mongo Connection ERROR: ' + error)
        })
    
        const run = async () => {
          await mongoose.connect(MONGODB_URI!, {
            autoReconnect: true, keepAlive: true, useNewUrlParser: true,
            useUnifiedTopology: true
          })
        }
        run().catch(error => console.error(error))
    }
    public socket(): void{
      const io = new Server(this.httpServer, {
        cors: {
          origin: '*',
          credentials: true
        }
      })
      io.use((socket: any, next) => {
        try {
          const token = socket.handshake.query.token
          const payload: any = jwt.verify(token, JWT_SECRET!)
          socket.userId = payload.id
          next()
        } catch (err) {}
      })
      let sockerFunction: SocketFunction = new SocketFunction()
      sockerFunction.socket(io)
    }
    public start(): void {
        this.httpServer.listen(PORT, () => {
          console.log(
            '  API is running at http://localhost:%d',
            PORT
          )
        })
      }
}

const server = new App()
server.start()