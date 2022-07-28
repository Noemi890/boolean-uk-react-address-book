const APIurl = 'http://localhost:4000/contacts'
const APImeetings = 'http://localhost:4000/meetings'

const initialValues = {
  firstName: '',
  lastName: '',
  street: '',
  city:'',
  email: '',
  linkedin: '',
  twitter: ''
}

const initialMeetings = {
  "date": "",
  "content": ""
}

export {APIurl, APImeetings, initialValues, initialMeetings}