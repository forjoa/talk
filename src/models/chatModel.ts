import { Schema, Document, Model, Types, model, models } from 'mongoose'

export interface IChat {
  participants: Types.ObjectId[]
  messages: Types.ObjectId[]
}

export interface IChatDocument extends IChat, Document {
  createdAt: Date
  updatedAt: Date
}

const chatSchema = new Schema<IChatDocument>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Chat: Model<IChatDocument> = models?.Chat || model('Chat', chatSchema)

export default Chat
