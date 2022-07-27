import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { APIurl } from "../utils/vars"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component
  const { contacts } = props

  const handleDelete = async e => {
    fetch(`${APIurl}/${e.target.value}`, {
      method: "DELETE",
      headers: {
          'Content-type': 'application/json'
      }
    })
  }

  // const handleEdit = () => {}
  
  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link to={`/contacts/${contact.id}`}>
                  View
                </Link>
              </p>
              <p>
              <button value={contact.id} onClick={(e) => handleDelete(e)}>❌ Delete</button>
              </p>
              <p>
                <Link to={`/contacts/${contact.id}/edit`}> Edit </Link>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
