<script>
import axios from 'axios'
import { store } from '../store'
export default {

    data() {
        return {
            listaCard: [],
            listaForm: [],
            selected: null,
            cardInterest: '',
            currentAttribut: null,
            rangeAtak: 0,
            research : null
        }
    },
    methods: {
        importcard() {
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?language=it&num=40&offset=0').then((response) => {
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
                this.research === false
            })
        },
        filterlist() {
            this.listaCard = []
            axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=' + this.cardInterest + '%', {
                params: {
                    archetype: this.selected,
                    attribute: this.currentAttribut,
                    num: null,
                    atk :'gte'+this.rangeAtak
                }
            }).then((response) => {
                this.listaCard = response.data.data
                console.log(response.data)
                console.log(this.listaCard)
            })
            console.log(this.cardInterest)
        },
        filterlistForm() {
            axios.get('https://db.ygoprodeck.com/api/v7/archetypes.php').then((response) => {
                this.listaForm = response.data
                console.log(this.listaForm)
            })
        },
        selecetGender() {
            console.log(this.selected)
        },
        // modyfylistForArchetype(){

        // }
    },
    mounted() {
        this.importcard()
        console.log(this.listaCard)
        this.filterlistForm()
    }
}
</script>
<!-- v-bind:value non accetta un valore genere['archetype_name'] ma solo con il punto -->
<template>
    <input type="text" class="input" v-model="cardInterest" placeholder="cerca una carta">
    <label for="exampleDataList" class="form-label">Datalist example</label>
    <div class="container">
        <h4 >risultati {{ listaCard.length }}</h4>
        
        <div class="row">
            <div class="col-4">
                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to archetype"
                    v-model="selected" @keyup.enter="selecetGender()">
                <datalist id="datalistOptions">
                    <select name="" id="">

                        <option :value="genere.archetype_name" v-for="genere in listaForm"
                            @click="selecetGender(genere.archetype_name)">{{ genere["archetype_name"] }}</option>
                    </select>

                </datalist>
                <div>{{ selected }}</div>
            </div>
            <div class="col-4">
                <input class="form-control" list="datalistO" id="exampleData" placeholder="select ve attribute"
                    v-model="currentAttribut" @keyup.enter="selecetGender()">
                <datalist id="datalistO">
                    <select name="" id="">
                        <option value="dark">Dark</option>
                        <option value="divine">Divine</option>
                        <option value="earth">Eart</option>
                        <option value="fire">Fire</option>
                        <option value="light">Light</option>
                        <option value="water">Water</option>
                        <option value="wind">Wind</option>
                    </select>

                </datalist>
                <div>{{ currentAttribut }}</div>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <input type="range" id="cardatak" v-model="rangeAtak" name="cardatak" min="0" max="5000"  >
                    <input type="number" v-model="rangeAtak">
                    <label for="cardatak">ATK > OF : {{ rangeAtak }}</label>
                </div>

            </div>

        </div>

    </div>

    <button class="btn btn-primary" @click="filterlist()">cerca</button>
    <div class="container">
        <div class=" row container-card">
            <div class="col-2 col-card" v-for="card in listaCard">
                <div class="card h-100">
                    <img class="card-img-top" :src="card['card_images'][0].image_url">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ card['name'] }}</h5>
                        <p class="card-text">{{ card['archetype'] }} </p>
                        <p class="card-text">prezzo card-Market :{{ card["card_prices"][0]['cardmarket_price'] }}</p>
                        <p class="card-text">prezzo Amazon : {{ card['card_prices'][0]['amazon_price'] }}</p>
                        <a href="#" class="btn btn-primary mt-auto">Go somewhere</a>
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