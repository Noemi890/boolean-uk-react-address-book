import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { APIurl } from "../utils/vars"

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
      <p>Address: {contact.street} {contact.city}</p>
      <p>Email: {contact.email || 'Not Provided'}</p>
      <p>Twitter: {contact.twitter || 'Not Provided'}</p>
      <p>Linkedin: {contact.linkedin || 'Not Provided'} </p>
      <p><Link to={`/contacts/${contact.id}/meetings`}>View Meetings</Link></p>
    </div>
  )
}

export default ContactsView