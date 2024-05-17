import sendIcon from '@/assets/send.svg'
import Image from 'next/image'

export default function Chat({ params }: { params: { chat_id: number } }) {
  const chat_id = params.chat_id
  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-[100px] items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800'>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='avatar-fallback'>JD</div>
          </div>
          <div className='font-medium'>Jane Doe</div>
        </div>
        <p>Id chat {chat_id}</p>
      </div>
      <div className='flex-1 overflow-auto p-4'>
        <div className='space-y-4' />
      </div>
      <div className='border-t border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-950'>
        <form className='flex items-center gap-3 rounded-lg bg-white p-2 pr-4 shadow-sm dark:bg-gray-800'>
          <input
            className='input flex-1 outline-none border-none bg-transparent px-4 py-2 text-sm focus:ring-0 dark:text-gray-200'
            placeholder='Type your message...'
          />
          <button type='submit'>
            <Image src={sendIcon} alt='Send icon' />
          </button>
        </form>
      </div>
    </div>
  )
}
