import * as axios from 'axios'
// import { name } from 'file-loader'

const BASE_URL = 'http://localhost:8000'

function upload (formData) {
  const url = `${BASE_URL}/api/database/files/`
  console.log(formData.get('photo'))
  return axios.post(url, formData)
  // get data
    .then(x => x.data)
    // add url field
    // .then(x => x.map(img => Object.assign({},
    //   img, { url: `${BASE_URL}/${img.id}` })))
}

function uploadBis (formData) {
  const url = `${BASE_URL}/api/database/files/`
  console.log(formData.get('photo'))
  return axios.post(url, formData)
  // get data
    .then(x => x.data)
}

export { upload, uploadBis }
