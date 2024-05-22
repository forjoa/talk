import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import sendIcon from '@/assets/send.svg'
import { sendMessage } from '@/lib/lib'

function MessageInput({ chatId, currentUserID }: { chatId: number, currentUserID: number }) {
  const [formData, setFormData] = useState({
    conversationId: chatId,
    senderId: currentUserID,
    content: '',
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (formData.conversationId && formData.senderId && formData.content) {
        await sendMessage(formData)
        setFormData({
            ...formData,
            content: ''
        })
    }
  }

  return (
    <div className='border-t-2 border-white bg-black p-4'>
      <form
        className='flex items-center gap-3 rounded-lg border-2 bg-white bg-opacity-30 p-2 pr-4 shadow'
        onSubmit={handleSubmit}
      >
        <input type='hidden' name='conversationId' value={chatId} />
        <input type='hidden' name='senderId' value={currentUserID} />
        <input
          className='input flex-1 outline-none border-none bg-transparent px-4 py-2 text-sm focus:ring-0 dark:text-gray-200'
          placeholder='Type your message...'
          autoComplete='off'
          name='content'
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
        <button type='submit'>
          <Image src={sendIcon} alt='Send icon' />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
