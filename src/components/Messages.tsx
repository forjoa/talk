import { useEffect, useRef } from 'react'

function Messages({
  messages,
  currentUserID,
}: {
  messages: any[]
  currentUserID: number
}) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      className='flex-1 flex overflow-y-auto p-4 flex-col gap-4 snap-y h-full scroll-smooth'
      ref={messagesEndRef}
    >
      {messages?.map((message, index) => (
        <div
          key={message.message_id ?? index}
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
  )
}

export default Messages
