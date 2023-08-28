import axios from 'axios';
import { reactive } from 'vue'

export const store = reactive({
    listaCard : [],
    importcard() {
        
    },
    filterlist() {
        this.listaCard = []
        axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0&fname=' + this.cardInterest + '%').then((response) => {
            this.listaCard = response.data.data
            console.log(response.data)
            console.log(this.listaCard)
        })
        console.log(this.cardInterest)
    }

})



