import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
  <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
    <Toaster/>
  </SessionProvider>

  )
}

export default MyApp

