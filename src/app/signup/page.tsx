export default function Register() {
  const handleSubmit = async (e: FormData) => {
    'use server'
    const data = new FormData()

    data.append('username', e.get('username') as string)
    data.append('fullname', e.get('fullname') as string)
    data.append('password', e.get('password') as string)

    try {
      const result = await fetch(`${process.env.URL}/api/register`, {
        method: 'POST',
        body: data,
      })

      console.log(result.statusText)
    } catch (error: any) {
      console.error(error)
    }
  }
  return (
    <main className='flex h-screen w-screen items-center justify-between'>
      <div className='rounded border-2 p-8 shadow-[5px_5px_0px_0px_rgba(255,255,255)] w-4/5 block m-auto'>
        <h2 className='text-2xl'>Create a new account</h2>
        <form action={handleSubmit} className="h-auto">
          <label htmlFor='fullname' className='mt-8'>
            Full name
          </label>
          <input
            type='text'
            name='fullname'
            id='fullname'
            placeholder='Fullname'
            required
            className='w-full rounded border-2 shadow-[5px_5px_0px_0px_rgba(255,255,255)] bg-transparent p-4 my-2'
          />
          <label htmlFor='username' className='mt-8'>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            required
            className='w-full rounded border-2 shadow-[5px_5px_0px_0px_rgba(255,255,255)] bg-transparent p-4 my-2'
          />
          <label htmlFor='password' className='mt-8'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            required
            className='w-full rounded border-2 shadow-[5px_5px_0px_0px_rgba(255,255,255)] bg-transparent p-4 my-2'
          />
          <input
            type='submit'
            value='Sign up'
            className='w-full rounded border-2 shadow-[5px_5px_0px_0px_rgba(255,255,255)] bg-white text-black p-4 my-2 cursor-pointer'
          />
        </form>
      </div>
    </main>
  )
}
