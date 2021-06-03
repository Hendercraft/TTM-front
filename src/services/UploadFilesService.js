import http from '../http-common'

class UploadFilesService {
  upload (file, onUploadProgress, type, format) {
    let formData = new FormData()

    formData.append('url', file)
    formData.append('fileType', type)
    formData.append('file_extension', format)

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
