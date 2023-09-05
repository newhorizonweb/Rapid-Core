


<template>
    <div class="page">
        <UserOptions 
            @timerIsSet="timerIsSetFun"
            :firstGame="firstGame"
            :resultsMounted="resultsMounted" 
        />

        <AudioSettings
            :firstGame="firstGame"
        />

        <AudioMusic
            ref="AudioMusic"
            :firstGame="firstGame"
        />

        <GameField 
            @firstGame="isFirstGame"
            @resultsMounted="resultsMountedFun"
            @startGame="startGame"
            :timeDuration="timeDuration" 
        />
    </div>
    <br>
    v0.7.0
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import UserOptions from "./components/UserOptions.vue"
import AudioSettings from "./components/AudioSettings.vue"
import AudioMusic from "./components/AudioMusic.vue"
import GameField from "./components/GameField.vue"

export default defineComponent({
    name: "App",

    components: {
        UserOptions,
        AudioSettings,
        AudioMusic,
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
        },

        startGame(){
            (this.$refs.AudioMusic as InstanceType<typeof AudioMusic>).playMusicInit();
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

.muted-audio .mute-btn{
    border-color:red;
}

</style>