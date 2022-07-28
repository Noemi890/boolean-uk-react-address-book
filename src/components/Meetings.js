import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { initialMeetings, APImeetings} from "../utils/vars"

export const Meetings = () => {
  const [newMeeting, setNewMeeting] = useState(initialMeetings)
  const [meetings, setMeetings] = useState([initialMeetings])

  if(!meetings) return <>Loading..</>

  const {id} = useParams()

  useEffect(() => {
    fetch(`${APImeetings}/?userId=${id}`)
      .then(resp => resp.json())
      .then(resp => {
        setMeetings(resp)
      })
  },[])

  const handleOnChange = e => {
    const {name, value} = e.target
    const copy = {...newMeeting}
    copy[name] = value
    copy.userId = id
    setNewMeeting(copy)
  }

  const postNewMeeting = () => {
    console.log('inside post')
    return fetch(`${APImeetings}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMeeting)
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    postNewMeeting()
    .then(resp => resp.json())
    .then( data => {
      setMeetings([...meetings, data])
      setNewMeeting(initialMeetings)
    }
    )
  }

  const handleClick = (id) => {
    fetch(`${APImeetings}/${id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(meetings)
      const index = meetings.findIndex(item => item.id === id)
      console.log(index)
      const copy = [...meetings]
      copy.splice(index, 1)
      console.log('copy without deleted element', copy)
      setMeetings(copy)
    })
  }


  return (
    <>
      <h2>Add a new Meeting</h2>
      <form className="form-stack contact-form" onSubmit={(e) => handleSubmit(e)}>

        <label htmlFor="content">Title</label>
        <input id="content" name="content" type="text" value={newMeeting.content} onChange={(e) => handleOnChange(e)} required/>

        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" value={newMeeting.date} onChange={(e) => handleOnChange(e)} required/>

        <label htmlFor="time">Time</label>
        <input id="time" name="time" type="time" value={newMeeting.time} onChange={(e) => handleOnChange(e)} required/>

        <label htmlFor="location">Location</label>
        <input id="location" name="location" type="text" value={newMeeting.location} onChange={(e) => handleOnChange(e)} required/>

      <div className="actions-section">

        <button className="button blue" type="submit">
          Add new Meeting
        </button>

      </div>
    </form>

    <h2>Your meetings</h2> 
      <ul>
        { (meetings) && (
          meetings.map((meet, i) => {
            console.log('my meeting',meet)
            return (
              <li key={i}>
                <p><strong>{meet.content}</strong></p>
                <p>Date: {meet.date}</p>
                <p>Time: {meet.time}</p>
                <p>Location: {meet.location}</p>
                <button onClick={() => handleClick(meet.id)}>❌ Delete</button>
              </li>
            )
          }))
        }
      </ul>
    </>
  )
}