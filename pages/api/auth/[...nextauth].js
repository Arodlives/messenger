import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb"
import { signIn } from "next-auth/react";

export const authOptions=
{
    providers:[
        // ?GoogleProvider
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
    ],
    // pages:{

    // },
    callbacks: {
      //! changed based on configuration options + providers used 
      // async signIn({account,profile}){
      //     if(account.provider === "Google"){
      //       //const user = await prisma.user.
      //       //checks if user is in DB -using Prisma 
      //     }
          
      //     //else if not in DB then add 
      //     return true
      // },
      async jwt({ token, account,user,profile }) {
        //* Persist the OAuth access_token to the token right after signin
      console.log("account", account)
      console.log("jwttoken", token)
        if (account) {
          token.accessToken = account.access_token
        }
        if (user) {
          token.role = user.role
          token.id = user.id
        }
        return token
      },
      adapter: PrismaAdapter(prisma),
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
      },
    },
    events:{
      async signIn(message){/*on successful sign in */},
      async signOut(message){/*on successful sign in */},
      async session(message){/*on successful sign in */},
    },
    debug:
      true,
  }
  
  export default NextAuth(authOptions)