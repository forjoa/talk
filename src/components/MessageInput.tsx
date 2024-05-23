import React, { FormEvent, useState } from 'react'
import { insertMessage } from '@/lib/lib'
import Image from 'next/image'
import sendIcon from '@/assets/send.svg'

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
      setFormData({
        ...formData,
        content: '',
      })
      sendMessage(formData.content)
      await insertMessage(formData)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, content: e.target.value })
    autoResizeTextarea(e.target)
  }

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent)
    }
  }

  return (
    <div className='border-t border-gray-900 bg-black p-4'>
      <form
        className='flex items-center gap-3 rounded-lg bg-gray-600 p-2'
        onSubmit={handleSubmit}
      >
        <input type='hidden' name='conversationId' value={chatId} />
        <input type='hidden' name='senderId' value={currentUserID} />
        <textarea
          className='input flex-1 outline-none border-none bg-transparent px-4 py-2 text-sm focus:ring-0 resize-none overflow-hidden'
          placeholder='Type your message...'
          autoComplete='off'
          name='content'
          onKeyDown={handleKeyPress}
          value={formData.content}
          onChange={handleInputChange}
          rows={1}
        />
        <button
          type='submit'
          className='h-full py-2 px-4 bg-white text-black rounded'
        >
          <Image src={sendIcon} alt='sendIcon'/>
        </button>
      </form>
    </div>
  )
}

export default MessageInput
