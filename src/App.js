import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import { ContactsEdit } from "./components/ContactsEdit"
import { Meetings } from "./components/Meetings"
import { InfinitySpin } from "react-loader-spinner"
import "./styles/styles.css"
import "./styles/loading.css"
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
      setTimeout(() => {
        setContacts(resp)
        setIsLoading(false);
      }, 3000)
    })
  },[])


  // console.log('contacts in app.js',contacts)

  return (
    <>
      {(isLoading) ? (
      <div className="container">
        <InfinitySpin 
          color="#088F8F" height={300} width={300}
        />
      </div>
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
            <Route path="/contacts/:id/meetings" element={<Meetings />} />
          </Routes>
        </main>
      </>
      )}
    </>
  )
}
