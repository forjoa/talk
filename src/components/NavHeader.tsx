import logoutIcon from '@/assets/logout.svg'
import Image from 'next/image'
import { logout } from '@/lib/lib'
import SearchUser from '@/components/SearchUser'
import Link from 'next/link'

const NavHeader = ({ username, userId } : { username: string, userId: number}) => {
  return (
    <div className='flex h-[100px] items-center justify-between border-b border-gray-900 px-4'>
      <div className='flex flex-col py-4 gap-2 w-full'>
        <div className='flex w-full justify-between items-center'>
          <div>Welcome, <Link href={'/myprofile'} className='underline cursor-pointer'>{username}</Link></div>
          <form action={logout} className='grid place-items-center'>
            <button type='submit'>
              <Image
                src={logoutIcon}
                alt='Logout icon'
                className='cursor-pointer'
              />
            </button>
          </form>
        </div>
        <SearchUser currentUserID={userId} />
      </div>
    </div>
  )
}

export default NavHeader
