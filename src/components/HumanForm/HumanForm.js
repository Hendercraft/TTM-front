import UploadFiles from '../UploadFiles.vue'

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
      output: ""
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
    }

  },
  getDataFromFileHandler: function(value){
    this.fileId = value
  }
}


