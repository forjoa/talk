import { Schema, model, models, Document, Model } from 'mongoose'

export interface IUser {
  username: string
  fullname: string
  password: string
}

// this are special 'columns' created by MongoDB and this is the actual interface we are using to recognize a User
export interface IUserDocument extends IUser, Document {
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User: Model<IUserDocument> = models?.User || model('User', userSchema)

export default User
