<template>
 <div>
    <div v-if="currentFile" class="progress">
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>

    <label class="btn btn-default">
      <input type="file" ref="file" @change="selectFile" />
    </label>

    <button class="btn btn-success" :disabled="!selectedFiles" @click="upload" v-on:click.stop="$emit('getId', this.fileId)">
      Upload
    </button>

    <div class="alert alert-light" role="alert">{{ message }}</div>

    <!-- <div class="card">
      <div class="card-header">List of Files</div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(file, index) in fileInfos"
          :key="index"
        >
          <a :href="file.url">{{ file.id }}</a>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
/*eslint-disable*/
import UploadService from '../services/UploadFilesService'

export default {
  name: 'upload-files',
  props:{
    type: String
  },
  data () {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: '',
      fileId: null,
      fileInfos: [],
      // type:"Image"
    }
  },
  mounted () {
    console.log(this.type)
  },

  methods: {
    selectFile () {
      this.selectedFiles = this.$refs.file.files
    },
    upload () {
      this.progress = 0
      console.log('uploading...')
      this.currentFile = this.selectedFiles.item(0)
      UploadService.upload(this.currentFile, event => {
        this.progress = Math.round((100 * event.loaded) / event.total)
      }, this.type)
        .then(response => {
          console.log("Uploaded")
          this.message = response.data
          this.fileId = response.data.id
          // this.$emit(this.fileId)
          // console.log(this.fileId)
        })
        .then(files => {
          this.fileInfos = files.data.results
        })
        .catch(() => {
          this.progress = 0
          this.message = 'Could not upload the file!'
          this.currentFile = undefined
        })

      this.selectedFiles = undefined
    }
  }
}
</script>
