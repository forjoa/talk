import Link from 'next/link'

const NavList = ({ chats } : { chats : any[]}) => {
  return (
    <div className='h-[calc(100%-100px)] max-h-[calc(100%-100px)] overflow-y-auto'>
      {chats.length === 0 ? (
        <p className='p-4'>You don&apos;t have any chat yet</p>
      ) : (
        chats.map((chat, index) => (
          <Link
            key={index}
            href={`/chat/${chat.conversation_id}`}
            className='flex p-4 m-2 rounded hover:underline border border-gray-900'
          >
            {chat.other_username as string}
          </Link>
        ))
      )}
    </div>
  )
}

export default NavList
