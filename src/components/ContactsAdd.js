import { useState } from "react"
import { useNavigate } from "react-router-dom";

const APIurl = 'http://localhost:4000/contacts'

const initialValues = {
  firstName: '',
  lastName: '',
  street: '',
  city:''
}

function ContactsAdd(props) {
  const [newPerson, setNewPerson] = useState(initialValues)

  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  
  const { setContacts, contacts } = props
  
  const navigate = useNavigate()
  
  const handleOnChange = event => {
    const {name, value} = event.target
    const personCopy = {...newPerson}
    personCopy[name] = value
    setNewPerson(personCopy)
  }

  const postingData = async () => {
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
      setContacts([...contacts], data)
      navigate('/')
    })
    
  }

  //TODO: Implement controlled form
  //send POST to json server on form submit

  return (
    <form className="form-stack contact-form">
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" value={newPerson.firstName} onChange={(event) => handleOnChange(event)} required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" value={newPerson.lastName} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" value={newPerson.street} onChange={(event) => handleOnChange(event)} required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" value={newPerson.city} onChange={(event) => handleOnChange(event)} required/>

      <div className="actions-section">
        <button className="button blue" type="submit" onClick={(e) => handleSubmit(e)}>
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
