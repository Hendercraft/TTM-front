// Take structure of a given table and return a form filled with it's data structure
/* eslint-disable*/ 
import http from '../http-common'

class FormService
{
    fetchStructure(table)
    {   
        var formlist = []
        http.get('database/structure/'+table+'/')
        .then(response => {
            formlist=response.data
            console.log(formlist)
            console.log("Retrieving of "+ table +" sucessfull")
        })
        .catch(error => {
            console.log("An error occured during data structure retrieving")
        })
        return formlist

    }

}

export default new FormService()
