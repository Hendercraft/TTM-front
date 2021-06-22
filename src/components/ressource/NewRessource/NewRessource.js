/* eslint-disable */
import ArchitectureForm from '@/components/forms/ArchitectureForm'
import ProductionForm from '@/components/forms/ProductionForm'
import HumanForm from '@/components/forms/HumanForm'
import RessourceForm from '@/components/forms/RessourceForm'

import LoginModal from '../../modals/Modal_Login'
import { tokenIsValid } from '../../../services/jwtService'


export default {
  name: 'new-ressource',
  components: { ArchitectureForm, ProductionForm, HumanForm, RessourceForm, LoginModal },
  props: [],
  data() {
    return {
      errors: [],
      name: null,
      date: null,
      category: undefined,
      connected:null
    }
  },
  computed: {

  },
  mounted() {
    this.userConnected()
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];
      if (this.name && this.date) {
        return true;
      }

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.date) {
        this.errors.push('Date required.');
      }
      return false
      // e.preventDefault();
    },

    userConnected()
    {
      this.connected = tokenIsValid()
      if(this.connected==false)
      {
        this.$modal.show('modal-login')
        this.$forceUpdate()
      }
      else
      {
        this.$forceUpdate()
      }
    }
  }
}