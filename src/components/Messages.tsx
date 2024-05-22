function Messages({ messages, currentUserID } : { messages : any[], currentUserID: number }) {
  return (
    <div className='flex-1 flex overflow-y-auto p-4 flex-col gap-4 snap-y'>
      {messages?.map((message) => (
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
  );
}

export default Messages;
