import { useSession, signIn, signOut } from "next-auth/react"
import toast from "react-hot-toast"

//  import Image from "next/image"

export default function Login() {
  // this is a custom client side handling
  const { data: session,status } = useSession()

  //* Google Handler 
    //? We pass it through a function to have less logic in jsx html
  async function handleGoogleSignin(){
    signIn('google',{callbackUrl:"http://localhost:3000/dashboard"})
    // signIn("google")
  }




  if (session) {
    return (
      <>
        Signed in as <img src={session.user.image} alt='google image' style={{borderRadius: '50px'}}/>
        {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn(handleGoogleSignin,toast.success)}>Sign in with Google</button>
    </>
  )
}