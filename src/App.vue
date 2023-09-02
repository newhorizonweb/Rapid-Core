


<template>
    <div class="page">
        <UserOptions 
            @timerIsSet="timerIsSetFun"
            :firstGame="firstGame">
        </UserOptions>
        <GameField 
            @firstGame="isFirstGame"
            :timeDuration="timeDuration">
        </GameField>
    </div>
    <br>
    v0.3.0
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import UserOptions from "./components/UserOptions.vue"
import GameField from "./components/GameField.vue"

export default defineComponent({
    name: 'App',

    components: {
        UserOptions,
        GameField
    },

    data(){
        return{
            timeDuration: 10,
            firstGame: true
        }
    },

    methods:{

        timerIsSetFun(newTimeDur: number){
            this.timeDuration = newTimeDur;
        },

        isFirstGame(wasPlayed: boolean){
            this.firstGame = wasPlayed;
        }

    }

})
</script>



<style lang="scss">

.body{
    display:flex;
    justify-content:center;
}

.page{
    margin:0 auto;
    display:flex;
    flex-direction:column;
    align-items:center;
}

</style>