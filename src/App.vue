


<template>
    <div class="page">
        <UserOptions 
            @timerIsSet="timerIsSetFun"
            :firstGame="firstGame"
            :resultsMounted="resultsMounted">
        </UserOptions>
        <GameField 
            @firstGame="isFirstGame"
            @resultsMounted="resultsMountedFun"
            :timeDuration="timeDuration">
        </GameField>
    </div>
    <br>
    v0.4.0
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import UserOptions from "./components/UserOptions.vue"
import GameField from "./components/GameField.vue"

export default defineComponent({
    name: "App",

    components: {
        UserOptions,
        GameField
    },

    data(){
        return{
            timeDuration: 10,
            firstGame: true,
            resultsMounted: false
        }
    },

    methods:{

        timerIsSetFun(newTimeDur: number){
            this.timeDuration = newTimeDur;
        },

        isFirstGame(wasPlayed: boolean){
            this.firstGame = wasPlayed;
        },

        resultsMountedFun(){
            (this.resultsMounted as boolean) = true
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