import axios from "axios";
import store from '../components/';

import { tokenAlive } from "jwtHelper";
import { jwtDecrypt } from "jwtHelper";

export default {
    data(){
        return {
            token: "",
            refreshToken: "",
            tokenExp: "",
            userId: "",
            userName: "",
        }
    },
    computed:{
        Token = jwtDecrypt(),
        console.log(Token),
    },
    methods:{
        isTokenActive: function(state) {
            if (!state.authData.tokenExp) {
            return false;
            }
            return tokenAlive(state.authData.tokenExp);
        },
        
        // jwtInterceptor : axios.create({}),
        
        
        // jwtInterceptor.interceptors.request.use(config => {
        
        //     const authData = store.getters['auth/getAuthData'];
        //     const isAuthenticated = store.getters['auth/isTokenActive'];
        //     if(isAuthenticated){
        //         config.headers.common["Authorization"] = `bearer ${authData.token}` ;
        //         return config;
        //     }
        //     else{
        //         const payload ={
        //             access_token: authData.token,
        //             refresh_token:authData.refresh_token
        //         };
        //         axios.post('http://localhost:8000/auth/refreshtoken',payload)
        //         .then(response => {
        //             console.log(response);
        //             store.commit('auth/saveTokenData',response.data);
        //             return jwtInterceptor(config);
        //         },error => {
        //             config.log(error);
        //             return jwtInterceptor(config);
        //         });
        //     }
        
        // })
    }
}
