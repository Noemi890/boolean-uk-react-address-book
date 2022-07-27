import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { APIurl, initialValues } from "../utils/vars";

function ContactsAdd(props) {
  const [newPerson, setNewPerson] = useState(initialValues)

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  
  const { setContacts, contacts, person } = props
  
  const navigate = useNavigate()
  
  const handleOnChange = event => {
    const {name, value} = event.target
    const personCopy = {...newPerson}
    personCopy[name] = value
    setNewPerson(personCopy)
  }

  const postingData = async () => {
    console.log('blah')
      const resp = await fetch(APIurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPerson)
      })
      return resp.json()
  }

  const handleSubmit = async e => {
    console.log('in the handle')
    e.preventDefault()
    postingData()
    .then((data) => {
      setContacts([...contacts, data])
      setNewPerson(initialValues)
      navigate('/')
    })
    
  }

  //TODO: Implement controlled form
  //send POST to json server on form submit

  return (
    <form className="form-stack contact-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" value={newPerson.firstName} onChange={(event) => handleOnChange(event)} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" value={newPerson.lastName} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" value={newPerson.street} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" value={newPerson.city} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="text" pattern={"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"}
        value={newPerson.email} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="linkedin">Linkedin:</label>
      <input id="linkedin" name="linkedin" type="linkedin" value={newPerson.linkedin} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="twitter" value={newPerson.twitter} onChange={(event) => handleOnChange(event)} required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
