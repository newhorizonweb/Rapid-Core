


<template>

<div class="game">

    <div class="game-field" 
        ref="gameField" 
        @click="totalClicksFun"
        @click.self="playMissSound">
        
        <button v-if="firstGame" @click="startCountdown">START</button>

        <p class="pre-game-timer" v-if="gamePreTime">{{ gamePreTime }}</p>

        <div 
            class="game-core"
            :class="{'disable-core': !gamePlaying}"
            ref="gameCore"
            @click="coreClicked"
            v-show="showCore">
        </div>

    </div>

    <p class="main-font">Score: {{ gameScore }}</p>
    <p class="timer">
        Time left: 
        <span 
            class="main-font"
            :class="{'timer-animation': timerAnimation}">
            {{ ( timerCurrVal / 1000 ).toFixed(2) }}
        </span>
    </p>

    <button 
        v-show="gamePlaying"
        @click="finishGame(true)">
        -Finish-
    </button>

    <ResultsScreen 
        ref="resultInfo"
        @resultsMounted="$emit('resultsMounted')"
        :finishScreen="finishScreen"

        :gameScore="gameScore" 
        :timeDuration="timeDuration"
        :totalClicks="totalClicks">

        <template v-slot:start-btn>
            <button @click="startCountdown">PLAY AGAIN</button>
        </template>
        
    </ResultsScreen>

    <AudioGame
        ref="AudioGame"
        @audioGameElements="audioGameElements" 
    />

</div>

</template>



<script lang="ts">
import { defineComponent } from 'vue'
import ResultsScreen from "./ResultsScreen.vue"
import AudioGame from "./AudioGame.vue"


type AudioElemsType = {
    [key: string]: HTMLAudioElement;
};

export default defineComponent({
    name: "GameField",

    emits: [
        "firstGame",
        "resultsMounted",
        "startGame"
    ],

    components: {
        ResultsScreen,
        AudioGame
    },

    data(){
        return{
            // Audio
            startAudioElem: null as HTMLAudioElement | null,
            preTimeAudioElem: null as HTMLAudioElement | null,
            finishAudioElem: null as HTMLAudioElement | null,

            // Timer
            timerCurrVal: 0,
            timerInterval: undefined as number | undefined,
            timerAnimation: false,

            // Game Properties
            gamePreTime: "",
            gamePlaying: false,
            showCore: false,
            firstGame: true,
            finishScreen: false,
            
            // Game Logic
            gameScore: 0,
            totalClicks: 0
        }
    },

    props:[
        "timeDuration"
    ],

    methods:{

            /* Audio */

        audioGameElements(audio: AudioElemsType){
            this.startAudioElem = audio.start;
            this.preTimeAudioElem = audio.preTime;
            this.finishAudioElem = audio.finish;
        },

            /* Timer (Preparation & Game Duration) */

        delay(ms: number): Promise<void>{
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        async startCountdown(){
            // Mark that that it's not a first game
            this.firstGame = false;
            this.$emit("firstGame", this.firstGame);

            // Don't show the finish screen
            this.finishScreen = false;

            // Reset Score & total click count
            this.gameScore = 0;
            this.totalClicks = 0;

            // Hide the core
            this.showCore = false;

            // Preparation timer countdown
            this.gamePreTime = "3";
            (this.preTimeAudioElem as HTMLVideoElement).play();
            await this.delay(1000);

            this.gamePreTime = "2";
            (this.preTimeAudioElem as HTMLVideoElement).play();
            await this.delay(1000);

            this.gamePreTime = "1";
            (this.preTimeAudioElem as HTMLVideoElement).play();
            await this.delay(1000);

            this.gamePreTime = "START";
            (this.startAudioElem as HTMLVideoElement).play();
            await this.delay(1000);

            this.gamePreTime = "";

            // Start the game and set the core position
            this.startGame();
            this.corePosition();
        },

        timerFunction(){
            clearInterval(this.timerInterval);

            // Convert to ms to avoid floating-points errors
            this.timerCurrVal = this.timeDuration * 1000;

            // Update every 10ms
            this.timerInterval = setInterval(() => {
                this.timerCurrVal -= 10;

                if (this.timerCurrVal / 1000 <= 3 && 
                    this.timerCurrVal / 1000 > 0 && 
                    Number.isInteger(this.timerCurrVal / 1000)){

                    this.timerAnimation = true;

                    // Remove the animation class after 1s
                    setTimeout(() => {
                        this.timerAnimation = false;
                    }, 900);
                }

                if (this.timerCurrVal <= 0) {
                    this.finishGame(false);

                    // Save results in the Scoreboard component
                    (this.$refs.resultInfo as InstanceType<typeof ResultsScreen>).saveResults();
                }
            }, 10); 
        },

            /* Start / Finish */

        startGame(){
            this.gamePlaying = true;
            this.showCore = true;
            this.timerFunction();
            this.$emit("startGame");
        },

        finishGame(didUserEnd: boolean){
            // Stop the timer (if the game was finished manually)
            clearInterval(this.timerInterval);
            this.timerCurrVal = 0;

            // Finish the game
            this.gamePlaying = false;
            this.finishScreen = true;
            (this.finishAudioElem as HTMLVideoElement).play();

            // Call an event in the ResultsScreen (levels, fun facts, etc)
            (this.$refs.resultInfo as InstanceType<typeof ResultsScreen>).resultInfo(didUserEnd);
        },

            /* Game Logic */

        corePosition(){
            const gameCoreElem = this.$refs.gameCore as HTMLElement;
            const gameFieldElem = this.$refs.gameField as HTMLElement;

            // Get the game field width and height
            const gameFieldW = gameFieldElem.offsetWidth;
            const gameFieldH = gameFieldElem.offsetHeight;
            const gfPad = 30;

            // Generate a random position in the game field
            const randX = Math.floor(gfPad + Math.random() * ((gameFieldW - gfPad) - gfPad + 1));
            const randY = Math.floor(gfPad + Math.random() * ((gameFieldH - gfPad) - gfPad + 1));

            gameCoreElem.style.setProperty('--gc-top', randY.toString()+"px");
            gameCoreElem.style.setProperty('--gc-left', randX.toString()+"px");
        },

        coreClicked(){
            // Change core position
            this.corePosition();

            // Play the click sound
            (this.$refs.AudioGame as InstanceType<typeof AudioGame>).playClickSound();

            // Change user score
            this.gameScore++
        },

        totalClicksFun(){
            if (this.gamePlaying){
                this.totalClicks++
            }
        },

        playMissSound(){
            if (this.gamePlaying){
                (this.$refs.AudioGame as InstanceType<typeof AudioGame>).playMissSound();
            }
        }

    },

});
</script>



<style lang="scss">

.game{

    .game-field{
        height:350px;
        width:500px;
        box-sizing:border-box;
        position:relative;

        border:solid 2px grey;
        border-radius:10px;
    }

    .game-core{
        width:50px;
        aspect-ratio:1/1;

        position:absolute;
        top:var(--gc-top);
        left:var(--gc-left);
        transform:translate(-50%, -50%);

        background-color:blue;
        border-radius:50%;
        transition:0.075s;

        &.disable-core{
            pointer-events:none;
        }

    }

    .pre-game-timer{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        font-size:30px;
    }

    .timer{
        font-size:18px;
    }

    .timer-animation{
        animation:timerAnim 1s ease-in-out;
    }

    @keyframes timerAnim{
        0%{
            color:var(--txt-faded);
            font-size:18px;
        }
        15%{
            color:red;
        }
        20%{
            font-size:22px;
        }
        60%{
            color:var(--txt-faded);
        }
        65%{
            font-size:18px;
        }
    }

}

</style>