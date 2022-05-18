/*  eslint-disable  */
import http from '../http-common'

class UploadFilesService {
  upload (file, onUploadProgress, type, format) {
    let formData = new FormData()

    formData.append('url', file)
    formData.append('file_type', type)
    formData.append('file_extension', format)

    return http.post('database/file/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.token}`
      },
      onUploadProgress
    })
    .then(response => {
      let file_id = response.data.id
      return file_id
    })
  }

  getFiles () {
    return http.get('database/files/')
  }
}

export default new UploadFilesService()
