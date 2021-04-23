
export default {
  name: 'profile',
  components: {},
  props: [],
  data () {
    return {
      data:true,
      discipline:false,
      champs:false,
      etablissement:false,
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    changeToData(){
      this.data = true
      this.discipline = false
      this.champs = false
      this.etablissement = false
    },
    changeToDiscipline(){
      this.data = false
      this.discipline = true
      this.champs = false
      this.etablissement = false
    },
    changeToChamps(){
      this.data = false
      this.discipline = false
      this.champs = true
      this.etablissement = false
    },
    changeToEtablissement(){
      this.data = false
      this.discipline = false
      this.champs = false
      this.etablissement = true
    }

  }
}


