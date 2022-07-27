import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { APIurl, initialValues } from "../utils/vars"

export const ContactsEdit = (props) => {
  const [editedPerson, setEditedPerson] = useState(initialValues)

  const {contacts, setContacts} = props

  const userId = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${APIurl}/${userId.id}`)
      .then(resp => resp.json())
      .then(resp => {
        setEditedPerson(resp)
      })
  },[])

  const handleOnChange = event => {
    const {name, value} = event.target
    const personCopy = {...editedPerson}
    personCopy[name] = value
    setEditedPerson(personCopy)
  }

  const modifyData = async () => {
      const resp = await fetch(`${APIurl}/${userId.id}`, {
        method: 'PATCH',
        body: JSON.stringify(editedPerson),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return resp.json()
  }

  const handleSubmit = async e => {
    e.preventDefault()
    modifyData()
    .then((data) => {
      setContacts([...contacts], data)
      setEditedPerson(initialValues)
      navigate('/')
    })
    
  }
  

  return (
    <form className="form-stack contact-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" value={editedPerson.firstName} onChange={(event) => handleOnChange(event)} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" value={editedPerson.lastName} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" value={editedPerson.street} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" value={editedPerson.city} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="text" pattern={"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"}
        value={editedPerson.email} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="linkedin">Linkedin:</label>
      <input id="linkedin" name="linkedin" type="linkedin" value={editedPerson.linkedin} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="twitter" value={editedPerson.twitter} onChange={(event) => handleOnChange(event)} required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Save Changes
        </button>
      </div>
    </form> 
  )
}