'use client'
import sendIcon from '@/assets/send.svg'
import { getConversation, getOtherUser } from '@/lib/getters'
import { getSession, sendMessage } from '@/lib/lib'
import Image from 'next/image'
import Link from 'next/link'
import backIcon from '@/assets/arrow-left.svg'
import { useEffect, useState } from 'react'

export default function Chat({ params }: { params: { chat_id: number } }) {
  const [chatId, setChatId] = useState(params.chat_id)
  const [currentUserID, setCurrentUserID] = useState<number | undefined>(
    undefined
  )
  const [messages, setMessasges] = useState<any[]>()
  const [otherFullname, setOtherFullname] = useState<any>()

  // use effect to get current user id
  useEffect(() => {
    getSession().then((response) => setCurrentUserID(response.user_id))
  }, [])

  // get conversation messages
  useEffect(() => {
    if (chatId) {
      getConversation(chatId).then((response) => setMessasges(response))
    }
  }, [chatId])

  // get data from user that is not me
  useEffect(() => {
    if (chatId && currentUserID) {
      getOtherUser(chatId, currentUserID as number).then((response) =>
        setOtherFullname(response.other_fullname)
      )
    }
  }, [chatId, currentUserID])

  return (
    <>
      {currentUserID && messages && otherFullname ? (
        <div className='flex h-full flex-col md:mx-4 md:border-2 md:rounded'>
          <div className='flex h-[70px] md:h-[100px] items-center justify-between border-b border-white px-4'>
            <div className='flex items-center gap-3'>
              <Link href={'/chat'} className='block md:hidden'>
                <Image src={backIcon} alt='Go back icon' />
              </Link>
              <div className='avatar'>
                <div className='bg-gray-600 h-10 w-10 rounded-full grid place-items-center border shadow'>
                  {otherFullname?.toString().split(' ')[0].charAt(0) +
                    '' +
                    otherFullname?.toString().split(' ')[1].charAt(0)}
                </div>
              </div>
              <div className='font-medium'>{otherFullname as string}</div>
            </div>
          </div>
          <div className='flex-1 flex overflow-y-auto p-4 flex-col gap-4 snap-y'>
            {messages?.map((message: any) => (
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
      ) : (
        <p className='w-full h-screen grid place-items-center'>
          Loading chat...
        </p>
      )}
    </>
  )
}
