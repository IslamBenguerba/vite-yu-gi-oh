<script>
import axios from 'axios'
import cardInterest from './Navbar.vue'
export default {
    data() {
        return {
            listaCard: [],
            cardInterest: ''
        }
    },
    methods: {
        importcard() {
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0').then((response) => {
                this.listaCard = response.data.data
                

                for (let i = 0; i < this.listaCard.length; i++) {
                    const card = this.listaCard[i]
                    if (typeof card.archetype === 'undefined') {
                        
                        if (typeof card.atk === 'undefined') {
                            card.archetype = 'Magic'
                        } else {
                            card.archetype = 'Monster'
                        }

                    }
                }
            })
        },
        filterlist() {
            this.listaCard = []
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0&fname='+this.cardInterest+'%').then((response) => {
                this.listaCard =response.data.data
                console.log(response.data)
                console.log(this.listaCard)
            })
            console.log(this.cardInterest)
        }
    },
    mounted() {
        this.importcard()

    }
}
</script>
<template>
    <input type="text" class="input" v-model="cardInterest">
    <button class="btn btn-primary" @click="filterlist()">cerca</button>
    <div class="container">
        <div class=" row container-card">
            <div class="col col-card" v-for="card in listaCard">
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