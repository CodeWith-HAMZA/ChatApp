import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebaseconfig'
import ChatBar from './ChatBar'
import ContactsBar from './ContactsBar'

const ChatBox = () => {
  return (
    <>
      <button onClick={() => signOut(auth)}>Logout</button>
      <div className='flex p-2 m-auto bg-slate-300 max-w-[44rem] border-yellow-600 border h-[20rem]'>
        <ContactsBar />
        <ChatBar />
      </div>
    </>
  )
}

export default ChatBox