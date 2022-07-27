import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"
const APIurl = 'http://localhost:4000/contacts'

export default function App() {
  const [contacts, setContacts] = useState([])
  
  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    fetch(APIurl)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp)
      setContacts(resp)})
  },[])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li><Link to='/'>Contacts List</Link></li>
          <li><Link to='/contacts/add'>Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={ <ContactsList contacts={contacts}/>}/>
          <Route path="/contacts/add" element={ <ContactsAdd contacts={contacts} setContacts={setContacts}/>}/>
          <Route path='/contacts/:id' element={ <ContactsView />} />
        </Routes>
      </main>
    </>
  )
}
