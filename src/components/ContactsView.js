import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const APIurl = 'http://localhost:4000/contacts'

function ContactsView() {
  const [contact, setContact] = useState(false)

  const userId = useParams()

  // console.log(userId)

  useEffect(() => {
    fetch(`${APIurl}/${userId.id}`)
    .then(resp => resp.json())
    .then(resp => {
      // console.log('myresp',resp)
      setContact(resp)
    })
  },[userId])

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
    </div>
  )
}

export default ContactsView