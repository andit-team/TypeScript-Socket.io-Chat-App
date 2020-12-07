import { Document, Schema, Model, model, Error, Mongoose } from 'mongoose'

export interface MessageInterface extends Document {
  message: string
  sender: string
  reciver: string
}

export const messageSchema: Schema = new Schema({
    message: String,
    sender: {
        type: new Mongoose().Schema.Types.ObjectId,
        ref: 'User',
    },
    reciver: {
        type: new Mongoose().Schema.Types.ObjectId,
        ref: 'User',
    },
})

export const Message: Model<MessageInterface> = model<MessageInterface>('Message', messageSchema)
