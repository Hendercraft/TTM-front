import axios from 'axios'

import { tokenAlive, jwtDecrypt } from '../services/jwtHelper'

export default {
  data () {
    return {
      token: '',
      refreshToken: '',
      tokenExp: '',
      userId: '',
      userName: ''
    }
  },
  computed: {
  },
  methods: {
  }
}
