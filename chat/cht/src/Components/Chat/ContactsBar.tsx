import React from 'react'
import ContactsList from './ContactsList'

const ContactsBar: React.FC = (): JSX.Element => {
  return (
    <section className='flex flex-col gap-4 border-2 m-2 border-orange-500 w-[15rem]'>

      <form className='flex gap-1 justify-center'>
        <input type={'text'} className="w-[7rem]" placeholder="search"/>
        <button type="submit" className='bg-gray-400'>Search </button>
      </form>
      <ContactsList />
    </section>
  )
}

export default ContactsBar