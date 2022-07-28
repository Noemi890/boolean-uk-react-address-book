import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { initialMeetings, APImeetings } from "../utils/vars"

export const Meetings = () => {
  const [meetings, setMeetings] = useState([initialMeetings])

  if(!meetings) return <>Loading..</>

  const id = useParams()

  useEffect(() => {
    fetch(`${APImeetings}/${id.id}`)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp)
      setMeetings(resp.meetings)
    })
  },[id])


  return (
    <>
    <ul>
      { (meetings) && (
        meetings.map((meet, i) => {
          return (
            <li key={i}>Date: {meet.date}
              <p>Content: {meet.content}</p>
            </li>
          )
        }))
      }
    </ul>
    </>
  )
}