<script>
import axios from 'axios'
export default {
    data() {
        return {
            listaCard: []
        }
    },
    methods: {
        importcard() {
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0').then((response) => {
                this.listaCard = response.data
                console.log(this.listaCard)
                
                for(let i = 0; i<this.listaCard.length;i++){
                    const card = this.listaCard[i]
                    console.log(card)
                    }
                
                
            })}
    },
    mounted() {
        this.importcard()
        
    }
}
</script>
<template>
    <div class="container">
        <div class=" row container-card">
            <div class="col col-card" v-for="card in listaCard.data" >
                <div class="card">
                    <img class="card-img-top" :src="card['card_images'][0].image_url">
                    <div class="card-body">
                        <h5 class="card-title">{{ card['name'] }}</h5>
                        <p class="card-text">{{ card['archetype'] }}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.container-card {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;


}

.col.col-card {
    background-color: oklch(62.35% 0.215 20.12);

    flex-basis: calc((100% /5) - 1rem);
}
</style>