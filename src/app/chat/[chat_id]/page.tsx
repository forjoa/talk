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
    <div className='flex h-full flex-col md:mx-4 md:border-2 md:rounded'>
      <div className='flex h-[70px] md:h-[100px] items-center justify-between border-b border-white px-4'>
        <div className='flex items-center gap-3'>
          <Link href={'/chat'} className='block md:hidden'>
            <Image src={backIcon} alt='Go back icon' />
          </Link>
          <div className='avatar'>
            <div className='bg-gray-600 h-10 w-10 rounded-full grid place-items-center border shadow'>
              {other_fullname?.toString().split(' ')[0].charAt(0) +
                '' +
                other_fullname?.toString().split(' ')[1].charAt(0)}
            </div>
          </div>
          <div className='font-medium'>{other_fullname as string}</div>
        </div>
      </div>
      <div className='flex-1 flex overflow-y-auto p-4 flex-col gap-4 snap-y'>
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
              className={`p-3 rounded-lg w-auto max-w-[80%] border-2 shadow ${
                message.sender_id === currentUserID
                  ? 'bg-blue-500 border-white text-white'
                  : 'bg-white border-black text-black'
              }`}
            >
              <div className='text-sm'>{message.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='border-t-2 border-white bg-black p-4'>
        <form
          className='flex items-center gap-3 rounded-lg border-2 bg-white bg-opacity-30 p-2 pr-4 shadow'
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
