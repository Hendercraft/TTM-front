import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8000/api/database/files/',
  headers: {
    'Content-type': 'application/json'
  }
})
