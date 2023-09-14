


<template>

<div class="game">

    <div class="game-field glass-border"  
        ref="gameFieldElem"
        @click="totalClicksFun"
        @click.self="playMissSound">
        
        <button class="start-btn"
            v-if="firstGame" 
            @click="startCountdown">
            START
        </button>
        <p class="pre-game-timer" v-if="gamePreTime">{{ gamePreTime }}</p>

        <div class="game-field-inner"
            ref="gameField"
            @click.self="playMissSound">

            <div class="game-core"
                :class="{'disable-core': !gamePlaying, 'show-core': showCore}"
                ref="gameCore"
                @click="coreClicked">
            </div>

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
        @click="finishGame(true); userFinished=true">
        -Finish-
    </button>

    <ResultsScreen 
        ref="resultInfo"
        @resultsMounted="$emit('resultsMounted')"
        :finishScreen="finishScreen"

        :gameScore="gameScore" 
        :timeDuration="timeDuration"
        :totalClicks="totalClicks"
        :userFinished="userFinished"
        :windowResized="windowResized">

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

            // Game Interruption
            userFinished: false,
            windowResized: false,
            
            // Game Elements & Settings
            cursorColor: "",
            coreSize: 0,

            // Game Logic
            gameScore: 0,
            totalClicks: 0
        }
    },

    props:[
        "timeDuration"
    ],

    mounted(){
        // Core Size
        this.coreSize = (this.$refs.gameCore as HTMLElement).offsetWidth;

        // Finish on Window Resize
        this.resizeFinish();

        // Set the Cursor Color
        this.setCursorColor();
    },

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

            // Set core position
            this.corePosition();

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

                    if (this.gameScore > 0){
                        // Save results in the Scoreboard component
                        (this.$refs.resultInfo as InstanceType<typeof ResultsScreen>).saveResults();
                    }
                }
            }, 10); 
        },

            /* Start / Finish */

        startGame(){
            // Game interruption reset
            this.windowResized = false;
            this.userFinished = false;

            // Start the game
            this.gamePlaying = true;
            this.showCore = true;
            this.timerFunction();
            this.setCursorElem();
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

            this.setCursorColor();
        },

        resizeFinish(){
            window.addEventListener("resize", () => {
                if (this.gamePlaying){
                    this.windowResized = true;
                    this.finishGame(true);
                }
            });
        },

            /* Game Logic */

        corePosition(){
            const gameCoreElem = this.$refs.gameCore as HTMLElement;
            const gameFieldElem = this.$refs.gameField as HTMLElement;

            // Get the game field width and height
            const gameFieldW = gameFieldElem.offsetWidth;
            const gameFieldH = gameFieldElem.offsetHeight;

            // Core Size
            this.coreSize = gameCoreElem.offsetWidth;

            // Generate a random position in the game field
            const randX = Math.floor(Math.random() * 
                (gameFieldW - this.coreSize + 1));
            const randY = Math.floor(Math.random() * 
                (gameFieldH - this.coreSize + 1));

            gameCoreElem.style.transform = `translate3d(${randX}px, ${randY}px, 0px)`;
            gameCoreElem.classList.add("core-animation");
        },

        coreClicked(){
            // Remove the animation class
            (this.$refs.gameCore as HTMLElement).classList.remove("core-animation");

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
        },

            /* Cursor Color */

        setCursorColor(){
            // Get the CSS variable
            this.cursorColor = getComputedStyle(document.body).getPropertyValue("--mainCrosshair").trim();

            // Set the cursor to default
            // Or it won't update on ResultsScreen until the user moves the cursor
            const gameField = this.$refs.gameFieldElem as HTMLElement;
            gameField.style.cursor = "default";
        },

        setCursorElem(){
            // SVG custom cursor
            const svg = `<svg width="32px" height="32px" id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><style>.cls-1{fill:${this.cursorColor};}.cls-2{fill:#FFFFFF;}</style></defs><path class='cls-1' d='M11.8,26.9h-.7a12.1,12.1,0,0,1-5.9-5.9,1.5,1.5,0,0,1,.8-2,1.5,1.5,0,0,1,2,.7A8.6,8.6,0,0,0,12.4,24a1.5,1.5,0,0,1,.7,2A1.4,1.4,0,0,1,11.8,26.9Z'/><path class='cls-2' d='M31,17H21.9a1,1,0,0,1,0-2H31a1,1,0,0,1,0,2Z'/><path class='cls-2' d='M10.1,17H1a1,1,0,0,1,0-2h9.1a1,1,0,1,1,0,2Z'/><path class='cls-2' d='M16,11.1a.9.9,0,0,1-1-1V1a1,1,0,0,1,2,0v9.1A.9.9,0,0,1,16,11.1Z'/><path class='cls-2' d='M16,32a1,1,0,0,1-1-1V21.9a1,1,0,0,1,2,0V31A1,1,0,0,1,16,32Z'/><path class='cls-1' d='M6.6,13.3,6,13.1a1.5,1.5,0,0,1-.8-2,12.1,12.1,0,0,1,5.9-5.9,1.5,1.5,0,0,1,2,.8,1.5,1.5,0,0,1-.7,2A8.6,8.6,0,0,0,8,12.4,1.7,1.7,0,0,1,6.6,13.3Z'/><path class='cls-1' d='M25.4,13.3a1.7,1.7,0,0,1-1.4-.9A8.6,8.6,0,0,0,19.6,8a1.5,1.5,0,0,1-.7-2,1.5,1.5,0,0,1,2-.8,12.1,12.1,0,0,1,5.9,5.9,1.5,1.5,0,0,1-.8,2Z'/><path class='cls-1' d='M20.2,26.9a1.4,1.4,0,0,1-1.3-.9,1.5,1.5,0,0,1,.7-2A8.6,8.6,0,0,0,24,19.6a1.5,1.5,0,0,1,2-.7,1.5,1.5,0,0,1,.8,2,12.1,12.1,0,0,1-5.9,5.9Z'/><circle class='cls-2' cx='16' cy='16' r='2'/></svg>`;

            const encoded = btoa(svg);

            // Set it to be visible in the Game Field
            const gameField = this.$refs.gameFieldElem as HTMLElement;
            gameField.style.cursor = `url("data:image/svg+xml;base64,${encoded}") 16 16, auto`;
        }

    },

    watch:{

        cursorColor(){
            this.setCursorElem();
        }

    }

});
</script>



<style lang="scss">

.game{

    .game-field{
        container-type:inline-size;
        width:100%;
        aspect-ratio:3/2;
        padding:14px;

        position:relative;
        background:var(--colorGrad1);
        transition:var(--trans2);

        &:has(.start-btn:hover),
        &:has(.start-btn:hover):before{
            filter:brightness(150%);
        }
        
        &:after{
            content:"";
            width:100%;
            height:100%;

            position:absolute;
            top:0;
            left:0;

            opacity:0.1;
            background-color:var(--mainColor);
            border-radius:calc(var(--border) + var(--size4));
            pointer-events:none;
        }

        .game-field-inner{
            width:100%;
            height:100%;
        }
    }

    .game-core{
        will-change:transform;

        width:6cqw;
        aspect-ratio:1/1;
        position:absolute;

        opacity:0;
        pointer-events:none;
        z-index:100;

        &.disable-core{
            pointer-events:none;
        }

        &.show-core{
            opacity:1;
            pointer-events:all;
        }

        &:after{
            content:"";
            width:100%;
            height:100%;

            position:absolute;
            top:0;
            left:0;

            background-color:red;
            border-radius:50%;
        }

        &.core-animation:after{
            animation:coreAnimation 0.075s ease-in-out;
        }

    }

    @keyframes coreAnimation{
        0%{
            scale:0;
        }
        100%{
            scale:1;
        }
    }

    .pre-game-timer{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        font-size:30px;

        pointer-events:none;
        z-index:10;
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

    .start-btn{
        width:100%;
        height:100%;

        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);

        font-size:32px;

        background-color:transparent;
        border:none;
        border-radius:calc(var(--border) + var(--size4));

        cursor:pointer;
        z-index:10;
    }

    .game-field:hover .start-btn{
        color:var(--mainColor);
    }

}

</style>