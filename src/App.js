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
          {/* TODO: Make these links */}
          <li>Contacts List</li>
          <li>Add New Contact</li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={ <ContactsList contacts={contacts}/>}/>
        </Routes>
      </main>
    </>
  )
}
