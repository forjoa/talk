import sendIcon from '@/assets/send.svg'
import { getConversation, getOtherUser } from '@/lib/getters'
import { getSession, sendMessage } from '@/lib/lib'
import Image from 'next/image'
import Link from 'next/link'
import backIcon from '@/assets/arrow-left.svg'

export default async function Chat({
  params,
}: {
  params: { chat_id: number }
}) {
  const user = await getSession()
  const currentUserID = user.user_id
  const chatId = params.chat_id

  // get conversation messages
  const messages = await getConversation(chatId)

  // get data from user that is not me
  const { other_fullname } = await getOtherUser(chatId, currentUserID)

  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-[70px] md:h-[100px] items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800'>
        <div className='flex items-center gap-3'>
          <Link href={'/chat'} className='block md:hidden'>
            <Image src={backIcon} alt='Go back cion' />
          </Link>
          <div className='avatar'>
            <div className='bg-gray-600 h-10 w-10 rounded-full grid place-items-center'>
              {other_fullname?.toString().split(' ')[0].charAt(0) +
                '' +
                other_fullname?.toString().split(' ')[1].charAt(0)}
            </div>
          </div>
          <div className='font-medium'>{other_fullname as string}</div>
        </div>
      </div>
      <div className='flex-1 flex overflow-auto p-4 flex-col justify-end gap-1'>
        {messages.map((message: any) => (
          <div
            key={message.message_id}
            className={`flex ${
              message.sender_id === currentUserID
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`p-3 rounded-lg w-auto max-w-[80%] shadow-sm ${
                message.sender_id === currentUserID
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              <div className='text-sm'>{message.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='border-t border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-950'>
        <form
          className='flex items-center gap-3 rounded-lg bg-white p-2 pr-4 shadow-sm dark:bg-gray-800'
          action={sendMessage}
        >
          <input type='hidden' name='conversationId' value={chatId} />
          <input type='hidden' name='senderId' value={currentUserID} />
          <input
            className='input flex-1 outline-none border-none bg-transparent px-4 py-2 text-sm focus:ring-0 dark:text-gray-200'
            placeholder='Type your message...'
            autoComplete='off'
            name='content'
          />
          <button type='submit'>
            <Image src={sendIcon} alt='Send icon' />
          </button>
        </form>
      </div>
    </div>
  )
}
