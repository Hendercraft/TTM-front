import FormService from '../../services/FormService'

export default {
  name: 'form-handler',
  components: {},
  props: [],
  data () {
    return {
      table: undefined,
      data_structure: undefined

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    

    UploadForm: function()
    {
      console.log("here")
      this.data_structure = FormService.fetchStructure(this.table)
      console.log("yes")
      console.log(this.data_structure)
    },
    // displayForm: function(event) {
    //   var $this = this;
    //   var $validator = this.$validator;
    //   var data = {};
    //   this.questions.forEach(function(question) {
    //     if (question.validate !== undefined) {
    //       $validator.attach(question.label, question.validate);
    //       data[question.label] = question.answer;
    //     }
    //   });
    //   var $questions = this.questions;
    //   $validator.validateAll(data).then(function() {
    //     var form = [];
    //     $questions.forEach(function(question) {
    //       form.push({
    //         id: question.id,
    //         label: question.label,
    //         answer: question.answer
    //       });
    //     });
    //     alert("Valid form: "+JSON.stringify(form));
    //   }).catch(function(error) {
    //       $this.$children.forEach(function(child) {
    //     	child.$children.forEach(function(child) {
    //       	child.$validator.validateAll();
    //       });
    //     });
    //     alert("Invalid form. Error count:  " + $validator.getErrors().count());
    //   })
    // }

  }
}


