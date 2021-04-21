import UploadFiles from '../UploadFiles.vue'
import UploadService from '../../services/UploadFilesService'
import http from '../../http-common'

export default {
  name: 'human-form',
  components: {UploadFiles},
  props: [],
  data () {
    return {
      selected_type:null,
      format:null,
      formatGroup:null,
      fileId: null,
      output: "",

      designation: "",
      repere_historique:"",
      date: null,
      localization: "",
      adresse:"",
      description: "",
      mots_cles: "",
      source: "",
      editeur: "",
      droits: "",
      ressource_type: "",
      immatriculation: "",
      etude: "",
      auteur: "",
      date_etude: "",
      ressource_file: "",

      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: '',
      fileId: null,
      fileInfos: [],
    }
  },
  computed: {

  },
  mounted () {
    console.log(this.fileId)
  },
  methods: {
    getFormatGroup: function(event){

      // 1. Get the selected index
      const index = event.target.selectedIndex;
  
      // 2. Find the selected option
      const option = event.target.options[index];
  
      // 3. Select the parent element (optgroup) for the selected option
      const optgroup = option.parentElement;
  
      // 4. Finally, get the label (Country group)
      this.formatGroup = optgroup.getAttribute('label');
      
      this.output = '<p>Your Selected Group is <strong>' + this.formatGroup +'</strong></p>';
      console.log(this.formatGroup);
    },

  
  selectFile () {
    this.selectedFiles = this.$refs.file.files
  },
  upload () {
    this.progress = 0
    console.log('uploading...')
    this.currentFile = this.selectedFiles.item(0)
    UploadService.upload(this.currentFile, event => {
      this.progress = Math.round((100 * event.loaded) / event.total)
      }, this.formatGroup)
      .then(response => {
        console.log("Uploaded")
        this.message = response.data
        this.fileId = response.data.id
        http.post('database/ressource/create/', {
          "designation": this.designation,
          "repere_historique": this.repere_historique,
          "ressource_date": this.date,
          "localization": this.localization,
          "adress": this.adresse,
          "description": this.description,
          "mots_cles": this.mots_cles,
          "ressource_source": this.source,
          "editeur": this.editeur,
          "droits": this.droits,
          "ressource_type": this.ressource_type,
          "ressource_format": this.format,
          "immatriculation": this.immatriculation,
          "etude": this.etude,
          "auteur": this.auteur,
          "date_etude": this.date_etude,
          "ressource_file": this.fileId
        })
        .then(response =>{
          console.log(response.data)
        })
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
  },
}

