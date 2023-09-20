


<template>

<header>
    <LogoElem />
</header>

<main class="wrapper glass-border">

    <h1 class="main-heading">Settings</h1>

    <section class="settings">
        <div class="game-settings">
            <UserOptions 
                @timerIsSet="timerIsSetFun"
                :duringMatch="duringMatch"
                :resultsMounted="resultsMounted" 
            />

            <AudioSettings
                :firstGame="firstGame"
            />
        </div>

        <AudioMusic
            ref="AudioMusic"
            :firstGame="firstGame"
        />
    </section>

    <GameField 
        @firstGame="isFirstGame"
        @isDuringMatch="isDuringMatch"
        @resultsMounted="resultsMountedFun"
        @startGame="startGame"
        :timeDuration="timeDuration" 
    />
    
</main>

<footer class="wrapper glass-border">

    <div class="footer-credits">
        <p>Created by</p>
        <UveritLogo />
    </div>
    <div class="version">
        <p>v1.0.0</p>
        <p>© 2023 uverit</p>
    </div>
    
</footer>

<BgCores />

</template>



<script lang="ts">
import { defineComponent } from 'vue'
import LogoElem from "./components/pageElements/LogoElem.vue"
import UveritLogo from "./components/pageElements/UveritLogo.vue"
import UserOptions from "./components/UserOptions.vue"
import AudioSettings from "./components/AudioSettings.vue"
import AudioMusic from "./components/AudioMusic.vue"
import GameField from "./components/GameField.vue"
import BgCores from "./components/BgCores.vue"


export default defineComponent({
    name: "App",

    components: {
        LogoElem,
        UveritLogo,
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
            duringMatch: false,
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

        isDuringMatch(isMatch: boolean){
            this.duringMatch = isMatch;
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

    /* General */

body:not(.add-transition) *{
    transition:0s !important;
}

    /* Header & Main */

header{
    width:min(1024px, 100%);
    margin:0 auto;
    padding:var(--size6);

    display:flex;
    justify-content:center;

    & .rapid-core-logo{
        width:min(270px, 100%);
        position:relative;
        z-index:100;

        & svg{
            width:100%;

            & *{
                transition:fill var(--trans4);
            }

        }
    }

}

.main-heading{
    width:100%;
    padding-top:var(--size4);
    padding-bottom:var(--size6);
    text-align:center;
}

    /* Footer */

footer.wrapper{
    flex-direction:row;
    justify-content:space-between;
    align-items:flex-end;

    & p{
        font-size:14px;
    }

    & .footer-credits{
        display:flex;
        flex-direction:column;
        gap:var(--size1);

        & p{
            font-family:mainFont;
        }

        & .uverit-logo{
            height:var(--size6);

            & svg{
                height:100%;
            }

        }

    }

    & .version{
        display:flex;
        flex-direction:column;
        align-items:flex-end;
    }

}

@media screen and (width <= 320px){

    footer.wrapper{
        flex-direction:column;
        align-items:center;
        gap:var(--size6);

        & .version{
            align-items:center
        }

    }
    
}

</style>