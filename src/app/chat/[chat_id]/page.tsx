'use client'
import { useEffect, useState } from 'react'
import { getConversation, getOtherUser } from '@/lib/getters'
import { getSession } from '@/lib/lib'
import Header from '@/components/ChatHeader'
import Messages from '@/components/Messages'
import MessageInput from '@/components/MessageInput'
import io from 'socket.io-client'

export default function Chat({ params }: { params: { chat_id: number } }) {
  const [chatId, setChatId] = useState(params.chat_id)
  const [currentUserID, setCurrentUserID] = useState<number | undefined>(
    undefined
  )
  const [messages, setMessages] = useState<any[]>([])
  const [otherFullname, setOtherFullname] = useState<any>()
  const [socket, setSocket] = useState<any>(null)

  useEffect((): any => {
    const newSocket = io()
    setSocket(newSocket)

    getSession().then((response) => setCurrentUserID(response.user_id))

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    if (chatId) {
      getConversation(chatId).then((response) => setMessages(response))
    }
  }, [chatId])

  useEffect(() => {
    if (chatId && currentUserID) {
      getOtherUser(chatId, currentUserID as number).then((response) =>
        setOtherFullname(response.other_fullname)
      )
    }
  }, [chatId, currentUserID])

  useEffect(() => {
    if (socket) {
      socket.on('chat message', (message: any) => {
        setMessages((prevMessages) => [...prevMessages, { content: message.message, sender_id: message.currentUserID}])
      })
    }
  }, [socket])

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit('chat message', {message, chatId, currentUserID})
    }
  }

  return (
    <>
      {currentUserID && messages && otherFullname ? (
        <div className='flex h-full flex-col md:mx-4 md:border md:border-gray-900 md:rounded'>
          <Header otherFullname={otherFullname} />
          <Messages messages={messages} currentUserID={currentUserID}/>
          <MessageInput
            chatId={chatId}
            currentUserID={currentUserID}
            sendMessage={sendMessage}
          />
        </div>
      ) : (
        <p className='w-full h-screen grid place-items-center'>
          Loading chat...
        </p>
      )}
    </>
  )
}
