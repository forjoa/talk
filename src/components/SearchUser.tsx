'use client'
import searchIcon from '@/assets/search.svg'
import { getAllUsers, knowConversationExists } from '@/lib/getters'
import { getSession } from '@/lib/lib'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SearchUser({
  currentUserID,
}: {
  currentUserID: number
}) {
  const router = useRouter()
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])

  useEffect(() => {
    async function getUsers() {
      try {
        const user = await getSession()
        if (!user || !user.user_id) {
          throw new Error('User not authenticated')
        }
        const rows = await getAllUsers(user.user_id)
        setAllUsers(rows)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
    getUsers()
  }, [])

  useEffect(() => {
    const filtered = allUsers.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchTerm, allUsers])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const createConversation = async (otherUserID: number) => {
    const { exists, conversationId } = await knowConversationExists(currentUserID, otherUserID)

    router.push(`/chat/${conversationId}`)
  }

  return (
    <>
      <div className='flex items-center border-2 rounded border-white shadow py-2 px-4'>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Search a user'
          className='bg-transparent outline-none flex-grow'
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type='submit'>
          <Image src={searchIcon} alt='Search icon' />
        </button>
      </div>
      {filteredUsers.length !== 0 && searchTerm && (
        <div className='absolute top-[115px] left-0 md:left-4 bg-black border-2 z-10 w-full md:w-[282px] shadow rounded-b-xl'>
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className='p-4 border-t-2 border-white'
              onClick={() => createConversation(user.user_id)}
            >
              <p className='hover:underline cursor-pointer'>{user.username}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
