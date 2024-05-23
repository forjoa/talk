import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import sendIcon from '@/assets/send.svg'
import { insertMessage } from '@/lib/lib'

function MessageInput({
  chatId,
  currentUserID,
  sendMessage,
}: {
  chatId: number
  currentUserID: number
  sendMessage: (message: string) => void
}) {
  const [formData, setFormData] = useState({
    conversationId: chatId,
    senderId: currentUserID,
    content: '',
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (formData.conversationId && formData.senderId && formData.content) {
      sendMessage(formData.content)
      await insertMessage(formData)
      setFormData({
        ...formData,
        content: '',
      })
    }
  }

  return (
    <div className='border-t border-gray-900 bg-black p-4'>
      <form
        className='flex items-center gap-3 rounded-lg bg-gray-600 p-2 pr-4'
        onSubmit={handleSubmit}
      >
        <input type='hidden' name='conversationId' value={chatId} />
        <input type='hidden' name='senderId' value={currentUserID} />
        <input
          className='input flex-1 outline-none border-none bg-transparent px-4 py-2 text-sm focus:ring-0 '
          placeholder='Type your message...'
          autoComplete='off'
          name='content'
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </form>
    </div>
  )
}

export default MessageInput
