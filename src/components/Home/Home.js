import Bar from '@/components/Bar'
import upload from '@/components/upload'
import NewRessource from '@/components/ressource/NewRessource'

export default {
  name: 'home',
  components: {Bar, NewRessource, upload},
  props: [],
  data () {
    return {
      visite_virtuelle:false,
      multimedia:false,
      cartographie:false,
      home:true,
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    changeToVisite_virtuelle(){
      this.multimedia = false
      this.cartographie = false
      this.visite_virtuelle = true
      this.home = false
    },
    changeToMultimedia(){
      this.multimedia = true
      this.cartographie = false
      this.visite_virtuelle = false
      this.home = false
    },
    changeToCartographie(){
      this.multimedia = false
      this.cartographie = true
      this.visite_virtuelle = false
      this.home = false
    }
  }
}