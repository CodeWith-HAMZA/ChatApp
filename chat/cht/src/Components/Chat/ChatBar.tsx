import React from 'react'
import Message from './Message'

const ChatBar: React.FC = ():JSX.Element => {
    return (
        <section className='border-2 m-2 border-green-500 w-[100%] h-[17.5rem] overflow-scroll'>


            <Message text="text tera mein kiya haal krta hun ruk zara ruk bas abuuuuuuuuuuuuuuuuuuuu " position="left" />
            <Message text="text tera mein kiya haal krta hun ruk zara ruk bas abuuuuuuuuuuuuuuuuuuuu " position="left" />
            <Message text="text tera mein kiya haal krta hun ruk zara ruk bas abuuuuuuuuuuuuuuuuuuuu " position="right" />
            <Message text="text tera mein kiya haal krta hun ruk zara ruk bas abuuuuuuuuuuuuuuuuuuuu " position="right" />
            <Message text="text tera mein kiya haal krta hun ruk zara ruk bas abuuuuuuuuuuuuuuuuuuuu " position="left" />
            <Message text="text tera mein kiya haal krta hun ruk zara ruk bas abuuuuuuuuuuuuuuuuuuuu " position="right" />
            <Message text="text tera mein kiya haal krta hun ruk zara ruk bas abuuuuuuuuuuuuuuuuuuuu " position="right" />
            <Message text="text tera mein kiya haal krta hun ruk zara ruk bas abuuuuuuuuuuuuuuuuuuuu " position="left" />
            <Message text="text tera mein kiya haal krta hun ruk zara ruk bas abuuuuuuuuuuuuuuuuuuuu " position="right" />
        </section>
    )
}

export default ChatBar