import { connectToMongoDB } from "@/lib/db"

export default function Register() {
  const handleSubmit = async (e: FormData)=> {
    'use server'
    const data = new FormData()

    data.append('username', e.get('username') as string)
    data.append('fullname', e.get('fullname') as string)
    data.append('password', e.get('password') as string)

    try {
      await connectToMongoDB()
      const result = await fetch(`${process.env.URL}/api/register`, {
        method: 'POST',
        body: data
      })

      console.log(result)
      
    } catch (error : any) {
      console.error(error)
    }
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='rounded border-2 p-8 shadow-[5px_5px_0px_0px_rgba(255,255,255)]'>
        <h2 className='text-2xl'>Create a new account</h2>
        <form action={handleSubmit}>
          <input type="text" name="username" id="username" placeholder="Username" required className="w-full rounded border-2 shadow-[5px_5px_0px_0px_rgba(255,255,255)] bg-transparent p-4 my-2"/>
          <input type="text" name="fullname" id="fullname" placeholder="Fullname" required className="w-full rounded border-2 shadow-[5px_5px_0px_0px_rgba(255,255,255)] bg-transparent p-4 my-2"/>
          <input type="password" name="password" id="password" required className="w-full rounded border-2 shadow-[5px_5px_0px_0px_rgba(255,255,255)] bg-transparent p-4 my-2"/>
          <input type="submit" value="Sign up" className="w-full rounded border-2 shadow-[5px_5px_0px_0px_rgba(255,255,255)] bg-white text-black p-4 my-2 cursor-pointer"/>
        </form> 
      </div>
    </main>
  )
}
