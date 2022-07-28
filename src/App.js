import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import { ContactsEdit } from "./components/ContactsEdit"
import { Loading } from "./components/Loading"
import "./styles/styles.css"
import { APIurl } from "./utils/vars"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  //TODO: Load all contacts on useEffect when component first renders

  useEffect(() => {
    setIsLoading(true)
    fetch(APIurl)
    .then(resp => resp.json())
    .then(resp => {
      // console.log(resp)
      setContacts(resp)
      setIsLoading(false)
    })
  },[])


  // console.log('contacts in app.js',contacts)

  return (
    <>
      {(isLoading) ? (
        <Loading />
       ) : ( 
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
            <Route path="/" element={ <ContactsList contacts={contacts} setContacts={setContacts}/>}/>
            <Route path="/contacts/add" element={ <ContactsAdd contacts={contacts} setContacts={setContacts}/>}/>
            <Route path='/contacts/:id' element={ <ContactsView />} />
            <Route path="/contacts/:id/edit" element={<ContactsEdit contacts={contacts} setContacts={setContacts}/>} />
          </Routes>
        </main>
      </>
      )}
    </>
  )
}
