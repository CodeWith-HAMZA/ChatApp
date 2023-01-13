import React, { Fragment } from 'react'

const ContactsList: React.FC = ():JSX.Element => {
    const Contacts = Array.from({ length: 20 });
    return (
        <div className='flex flex-col h-[16rem] overflow-scroll'>

            {Contacts.map(elem => <div>
                    Contact
            </div>)    }
        </div>
    )
}

export default ContactsList