import { Document, Schema, Model, model, Error } from 'mongoose'

export interface UserInterface extends Document {
  username: string
  email: string
  password: string
}

export const userSchema: Schema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
},
{
  timestamps: true
})

export const User: Model<UserInterface> = model<UserInterface>('User', userSchema)
