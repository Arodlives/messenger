import { StreamChat } from "stream-chat";
import { useSession, signIn, signOut } from "next-auth/react"

export default function handler(req, res) {
    //accept user id to authenticate then create a token for that user 
    const { id } = JSON.parse(req.body);

    // Initialize a Server Client
    const serverClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY,process.env.STREAM_API_SECRET );
    // Create User Token
    //generate a token for the user with id 'of whatever is passed in'
    const token = serverClient.createToken(id);

    res.status(200).json({ token })
  }