'use client'
import { useEffect, useState } from 'react'
import { getConversation, getOtherUser } from '@/lib/getters'
import { getSession } from '@/lib/lib'
import Header from '@/components/ChatHeader'
import Messages from '@/components/Messages'
import MessageInput from '@/components/MessageInput'

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
          <Header otherFullname={otherFullname} />
          <Messages messages={messages} currentUserID={currentUserID} />
          <MessageInput chatId={chatId} currentUserID={currentUserID} />
        </div>
      ) : (
        <p className='w-full h-screen grid place-items-center'>
          Loading chat...
        </p>
      )}
    </>
  )
}
