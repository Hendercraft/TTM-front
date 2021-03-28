import http from '../http-common'

class UploadFilesService {
  upload (file, onUploadProgress) {
    let formData = new FormData()

    formData.append('url', file)
    formData.append('fileType', 'Image')

    return http.post('database/files/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
  }

  getFiles () {
    return http.get('database/files/')
  }
}

export default new UploadFilesService()
