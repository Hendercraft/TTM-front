import FormService from '../../services/FormService'
import Vue from 'vue'

Vue.component('form-input', {
  props: ['data_structure'],
  template: '<div class="form-group" :class="{\'input\': true, \'has-error\': errors.has(data_structure.label) }">' +
    '<input type="text" :id="data_structure.id" :name="data_structure.label"'+
           'class="form-control" v-model="data_structure.answer":placeholder="data_structure.placeholder"/>' +
    '    <span v-show="errors.has(data_structure.label)" class="help-block">{{ errors.first(data_structure.label) }}</span>' +
    '</div>'
});

Vue.component('form-select', {
    props: ['data_structure'],
    created: function () {
        this.$options.template = '<div class="form-group" :class="{\'input\': true, \'has-error\': errors.has(data_structure.label) }">' +
        '<select :id="data_structure.id" :name="data_structure.label" v-model="data_structure.answer" class="form-control" >' +
        '<option v-for="option in data_structure.options" >{{option}}</option>' +
        '</select>' +
        '<span v-show="errors.has(data_structure.label)" class="help-block">{{ errors.first(data_structure.label) }}</span>' +
        '</div>'
    }
});

Vue.component('form-radio', {
  props: ['data_structure'],
  created: function() {
    this.$options.template = '<div class="col-sm-9"> ' +
      '<label  v-for="option in data_structure.options" :for="option" class="radio-inline" >' +
      '<input :id="option" :name="data_structure.label" type="radio" v-model="data_structure.answer"' +
      '       :value="option"/> {{option}}' +
      '</label>' +
      '</div>';
  }
});

Vue.component('form-textarea', {
  props: ['data_structure'],
  template: '<textarea class="form-control" placeholder="" v-model="data_structure.answer"  :placeholder="data_structure.placeholder"/>'
});

export default {
  name: 'form-handler',
  components: {},
  props: [],
  data () {
    return {
      table: "date",
      data_structure: undefined

    }
  },
  computed: {

  },
  mounted () {

  },
  created:function(){
    this.TakeForm()
    this.$options.template = '<div class="form-group"> ' +
    '<label for="" class="col-sm-3 col-lg-2 control-label">' +
    '{{data_structure.label}}';

    console.log("ca ne marche pas")
    this.$options.template += '</label>' +
      '<div class="col-sm-9 col-lg-10">';
      
    switch (this.data_structure.type) {
      case 'input':
        this.$options.template += '<form-input :data_structure="data_structure"></form-input>';
        break;
      case 'select':
        this.$options.template += '<form-select :data_structure="data_structure"></form-select>';
        break;
      case 'radio':
        this.$options.template += '<form-radio :data_structure="data_structure"></form-radio>';
        break;
      case 'textarea':
        this.$options.template += '<form-textarea :data_structure="data_structure"></form-textarea>';
        break;
      default:
        this.$options.template += 'Unsupported data_structure type: ' + this.data_structure.type;
    }
    this.$options.template += '</div></div>';
  }
  ,
  methods: {
    
    TakeForm: function()
    {
      this.data_structure = FormService.fetchStructure(this.table)
      console.log(this.data_structure)
    },
    UploadForm: function()
    {
      this.TakeForm()
      this.$options.template = '<div class="form-group"> ' +
      '<label for="" class="col-sm-3 col-lg-2 control-label">' +
      '{{data_structure.label}}';

      this.$options.template += '</label>' +
        '<div class="col-sm-9 col-lg-10">';
      
      switch (this.data_structure.type) {
        case 'input':
          this.$options.template += '<form-input :data_structure="data_structure"></form-input>';
          break;
        case 'select':
          this.$options.template += '<form-select :data_structure="data_structure"></form-select>';
          break;
        case 'radio':
          this.$options.template += '<form-radio :data_structure="data_structure"></form-radio>';
          break;
        case 'textarea':
          this.$options.template += '<form-textarea :data_structure="data_structure"></form-textarea>';
          break;
        default:
          this.$options.template += 'Unsupported data_structure type: ' + this.data_structure.type;
    }
    this.$options.template += '</div></div>';
    }

  }
}


