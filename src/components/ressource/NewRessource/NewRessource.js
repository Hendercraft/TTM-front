import ArchitectureForm from '@/components/forms/ArchitectureForm'
import ProductionForm from '@/components/forms/ProductionForm'
import HumanForm from '@/components/forms/HumanForm'
import RessourceForm from '@/components/forms/RessourceForm'


export default {
  name: 'new-ressource',
  components: { ArchitectureForm, ProductionForm, HumanForm, RessourceForm },
  props: [],
  data() {
    return {
      errors: [],
      name: null,
      date: null,
      category: undefined
    }
  },
  computed: {

  },
  mounted() {

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
  }
}