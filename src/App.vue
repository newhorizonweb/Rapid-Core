


<template>

<header>
    <LogoElem />
</header>

<main class="wrapper">

    <section class="settings">
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
    </section>

    <GameField 
        @firstGame="isFirstGame"
        @resultsMounted="resultsMountedFun"
        @startGame="startGame"
        :timeDuration="timeDuration" 
    />
    
</main>

<footer class="wrapper">

    <p>v0.8.3</p>
    
</footer>

<BgCores />

</template>



<script lang="ts">
import { defineComponent } from 'vue'
import LogoElem from "./components/pageElements/LogoElem.vue"
import UserOptions from "./components/UserOptions.vue"
import AudioSettings from "./components/AudioSettings.vue"
import AudioMusic from "./components/AudioMusic.vue"
import GameField from "./components/GameField.vue"
import BgCores from "./components/BgCores.vue"

export default defineComponent({
    name: "App",

    components: {
        LogoElem,
        UserOptions,
        AudioSettings,
        AudioMusic,
        GameField,
        BgCores
    },

    data(){
        return{
            timeDuration: 10,
            firstGame: true,
            resultsMounted: false
        }
    },

    mounted(){
        // Add transition after the load, so the bg color doesn't flash
        document.body.classList.add("add-transition");

        // Append wrapper background
        this.appendWrapperBg();
    },

    methods:{

        appendWrapperBg(){
            const wrappers = document.querySelectorAll(".wrapper");

            wrappers.forEach((wrapper) => {
                const background = document.createElement("div");
                background.classList.add("wrapper-bg");
                wrapper.appendChild(background);
            });
        },

            /* Components */

        timerIsSetFun(newTimeDur: number){
            this.timeDuration = newTimeDur;
        },

        isFirstGame(wasPlayed: boolean){
            this.firstGame = wasPlayed;
        },

        resultsMountedFun(){
            (this.resultsMounted as boolean) = true;
        },

        startGame(){
            (this.$refs.AudioMusic as InstanceType<typeof AudioMusic>).playMusicInit();
        }

    }

})
</script>



<style lang="scss">

body:not(.add-transition) *{
    transition:0s !important;
}

header{
    width:1024px;
    margin:0 auto;
    padding:var(--size6);

    display:flex;
    justify-content:center;

    & svg{
        width:270px;
        margin-top:var(--size6);

        position:relative;
        z-index:100;

        & *{
            transition:fill var(--trans4);
        }

    }

}

.muted-audio .mute-btn{
    border-color:red;
}

</style>