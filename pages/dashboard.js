import { StreamChat } from 'stream-chat'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect,useState } from 'react'
import { Chat, Channel, ChannelHeader, MessageInput, Virtualized,MessageList, Window, MessageInputFlat ,LoadingIndicator,Thread} from 'stream-chat-react';

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [client,setClient]= useState(null)
  const [channel,setChannel]=useState(null)
  const { data: session } = useSession()

  // const id =session.user.id 
  // setUser({id}) 

  useEffect(()=>{
    async function init(){
  const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY)

  const { token } = await fetch('/api/token',{
    method:'POST',
    body:JSON.stringify({
      id:user.id
    })
  }).then(r=>r.json())

  // Once connected can begin using Stream Data 
  await chatClient.connectUser(
    {
        id: user.id,
        name: session.user.name,
        image: session.user.image,
    },
    token,
  )
   // Create a channel using your own id for that channel.
    const channel = client.channel('messaging',{
      members:[session.user.name,],
    })

    await channel.watch()
    setChannel(channel)
    setClient(chatClient)
  }

  init()
  if(client) return ()=> client.disconnectUser()  
  },[client,user.id,session])

  if(!channel || !client) return <LoadingIndicator/>

  return (
    <div>
    <Chat client={client} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader/>
              <MessageList/>
                <MessageInput/>
          </Window>
        </Channel>
        <Thread/>
    </Chat>
    </div>
  )
}
