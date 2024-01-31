


<template>

<div class="game">

    <div class="game-field-outer">
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
                    :class="{'show-core': gamePlaying}"
                    ref="gameCore"
                    @click="coreClicked">
                </div>

            </div>

            <ResultsScreen 
                ref="resultInfo"
                @resultsMounted="$emit('resultsMounted')"

                :finishScreen="finishScreen"
                :gamePlaying="gamePlaying"
                :duringMatch="duringMatch"

                :gameScore="resGameScore" 
                :timeDuration="timeDuration"
                :totalClicks="totalClicks"
                
                :userFinished="userFinished"
                :windowResized="windowResized">

                <template v-slot:start-btn>
                    <button class="rs-start-btn glass-btn"
                        @click="startCountdown">

                        Play Again
                    </button>
                </template>
                
            </ResultsScreen>

        </div>
    </div>

    <div class="match-info">

        <div class="timer"
            :class="{'timer-animation': timerAnimation}">

            <TimeIcon />
            <p class="main-font">
                {{ (timerCurrVal / 1000).toFixed(2) }}
            </p>
        </div>

        <button class="finish-btn glass-btn"
            v-show="gamePlaying"
            @click="finishGame(true); userFinished=true">
            Finish
        </button>

        <div class="score-info"
            :class="{'misclick': missAnim}">
            <p class="main-font">{{ gameScore }}</p>
            <ScoreIcon />
        </div>

    </div>

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
import TimeIcon from "./pageElements/TimeIcon.vue"
import ScoreIcon from "./pageElements/ScoreIcon.vue"



type AudioElemsType = {
    [key: string]: HTMLAudioElement;
};

export default defineComponent({
    name: "GameField",

    emits: [
        "firstGame",
        "resultsMounted",
        "isDuringMatch",
        "startGame"
    ],

    components: {
        ResultsScreen,
        AudioGame,
        TimeIcon,
        ScoreIcon
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
            duringMatch: false,
            gamePlaying: false,
            firstGame: true,
            finishScreen: false,

            // Game Interruption
            userFinished: false,
            windowResized: false,
            
            // Game Elements & Settings
            gameCoreElem: null as HTMLElement | null,
            gameFieldElem: null as HTMLElement | null,
            gameFieldW: 0,
            gameFieldH: 0,
            audioGameComp: null as InstanceType<typeof AudioGame> | null,

            missAnim: false,
            missAnimTimeout: null as number | null,
            cursorColor: "",
            coreSize: 0,

            // Game Logic
            gameScore: 0,
            resGameScore: 0,
            totalClicks: 0
        }
    },

    props:[
        "timeDuration"
    ],

    mounted(){

        // Elements
        this.gameCoreElem = this.$refs.gameCore as HTMLElement;
        this.gameFieldElem = this.$refs.gameField as HTMLElement;
        this.audioGameComp = this.$refs.AudioGame as InstanceType<typeof AudioGame>;

        // Core Size
        this.coreSize = this.gameCoreElem.offsetWidth;

        // Game Field Size
        this.gameFieldSize();
        window.addEventListener("resize", this.gameFieldSize);

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

            // During the match
            this.duringMatch = true;
            this.$emit("isDuringMatch", this.duringMatch);

            // Change the cursor
            this.setCursorElem();

            // Close the scoreboard
            (this.$refs.resultInfo as InstanceType<typeof ResultsScreen>).closeScoreboard();

            // Don't show the finish screen
            this.finishScreen = false;

            // Reset Score & total click count
            this.gameScore = 0;
            this.totalClicks = 0;

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

            this.gamePreTime = "GO";
            (this.startAudioElem as HTMLVideoElement).play();
            await this.delay(1000);

            this.gamePreTime = "";

            // Start the game and set the core position
            this.startGame();

            // Reset the Results Game Score after the game has started
            this.resGameScore = 0;

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

            // Set core position
            this.corePosition();

            // Start the game
            this.gamePlaying = true;
            this.timerFunction();
            this.$emit("startGame");

        },

        finishGame(didUserEnd: boolean){

            // Stop the timer (if the game was finished manually)
            clearInterval(this.timerInterval);
            this.timerCurrVal = 0;

            // Finish the game
            this.gamePlaying = false;

            this.duringMatch = false;
            this.$emit("isDuringMatch", this.duringMatch);

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

            /* Game Field */

        gameFieldSize(){
            this.gameFieldW = this.gameFieldElem!.offsetWidth;
            this.gameFieldH = this.gameFieldElem!.offsetHeight;
        },

            /* Game Logic */

        corePosition(){
            
            // Generate a random position in the game field
            const randX = Math.floor(Math.random() * 
                (this.gameFieldW - this.coreSize + 1));
            const randY = Math.floor(Math.random() * 
                (this.gameFieldH - this.coreSize + 1));
            
            // Set the position and add the animation class
            this.gameCoreElem!.style.transform = `translate3d(${randX}px, ${randY}px, 0px)`;
            this.gameCoreElem!.classList.add("core-animation");

        },

        coreClicked(){

            // Remove the animation class
            this.gameCoreElem!.classList.remove("core-animation");

            // Game Field Size
            this.gameFieldSize();

            // Change core position
            this.corePosition();

            // Play the click sound
            this.audioGameComp!.playClickSound();

            // Change user score
            this.gameScore++
            this.resGameScore = this.gameScore;

        },

        totalClicksFun(){
            if (this.gamePlaying){
                this.totalClicks++
            }
        },

        playMissSound(){
            if (this.gamePlaying){
                // Play the miss sound
                this.audioGameComp!.playMissSound();

                // Trigger the miss icon animation
                this.triggerMissAnim();
            }
        },

        triggerMissAnim(){

            this.missAnim = true;

            if (this.missAnimTimeout) {
                clearTimeout(this.missAnimTimeout);
            }

            this.missAnimTimeout = setTimeout(() => {
                this.missAnim = false;
                this.missAnimTimeout = null;
            }, 250);

        },

            /* Cursor Color */

        setCursorColor(){

            // Get the CSS variable
            this.cursorColor = getComputedStyle(document.body).getPropertyValue("--mainTint1").trim();

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
    display:flex;
    flex-direction:column;

        /* Game Field */

    & .game-field-outer{
        width:100%;
        max-height:calc(100vh - (var(--size6) * 2));
        aspect-ratio:3/2;
        position:relative;

        display:flex;
        justify-content:center;
        align-items:center;
    }

    & .game-field{
        height:100%;
        aspect-ratio:3/2;
        padding:14px;
        position:relative;

        background:var(--colorGrad1);
        transition:var(--trans2);
        overflow-x:hidden;
        overflow-y:auto;

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
            border-radius:var(--size4);
            pointer-events:none;
        }

        & .game-field-inner{
            container-type:inline-size;
            width:100%;
            height:100%;
        }

    }

    .pre-game-timer{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);

        font-size:min(46px, 6vw);
        pointer-events:none;
        z-index:10;
    }

    .start-btn{
        width:100%;
        height:100%;

        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);

        font-size:min(46px, 6vw);
        background-color:transparent;
        border:none;
        border-radius:var(--size4);

        cursor:pointer;
        z-index:10;
    }

    .game-field:hover .start-btn{
        color:var(--mainColor);
    }

        /* Game Core */

    .game-core{
        will-change:transform;

        width:7cqw;
        aspect-ratio:1/1;
        position:absolute;

        opacity:0;
        border-radius:50%;

        pointer-events:none;
        overflow:hidden;
        z-index:100;

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

            background:linear-gradient(to right,
                var(--mainColor), var(--accColor));
            border-radius:50%;
            filter:blur(5px);
            animation:coreRotate 5s linear infinite;
        }

        &.core-animation:after{
            animation:coreRotate 5s linear infinite,
                coreAnimation 0.1s ease-in-out;
        }

    }

    @keyframes coreRotate{
        0%{
            transform:rotate(0deg);
        }
        100%{
            transform:rotate(360deg);
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

        /* Match Info */

    .match-info{
        width:100%;
        height:var(--size8);
        margin-top:var(--size4);

        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        align-items:center;

        & .timer,
        & .score-info{
            width:90px;
            height:var(--size7);

            display:flex;
            align-items:center;
            gap:var(--size2);

            & div, & svg{
                height:100%;
                aspect-ratio:1/1;
            }

            & p{
                margin-bottom:-2px;
            }

        }

        & .score-info{
            justify-content:flex-end;
        }

        & .timer{
            font-size:18px;
        }

        & .timer-animation svg :is(.cls-2, .cls-3){
            animation:timerAnimIcon 1s ease-in-out;
        }
        
        & .timer-animation p{
            animation:timerAnim 1s ease-in-out;
        }

        & .finish-btn{
            padding:var(--size3) var(--size6);
        }

    }

    @keyframes timerAnimIcon{
        0%{
            stroke:#FFF;
        }
        15%{
            stroke:#F00;
        }
        60%{
            stroke:#FFF;
        }
    }

    @keyframes timerAnim{
        0%{
            color:var(--txt-faded);
            font-size:18px;
        }
        15%{
            color:#F00;
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

    /* Media */

@media screen and (width <= 768px){

    .game{

        & .game-field-outer,
        & .game-field{
            aspect-ratio:1/1;
        }
        
    }
    
}

@media screen and (width <= 540px){

    .game{

        & .game-field-outer,
        & .game-field{
            aspect-ratio:2/3;
        }

        & .game-core{
            width:8.5cqw;
        }
        
    }
    
}

@media screen and (width <= 440px){

    .game{

        & .game-core{
            width:12cqw;
        }

        .match-info{
            height:auto;
            gap:var(--size4);

            & .timer,
            & .score-info{
                order:0;
                width:auto;
            }

            & .finish-btn{
                order:1;
                width:100%;
            }

        }

    }
    
}

@media screen and (width <= 320px){

    .game{

        & .game-core{
            width:15cqw;
        }

    }
    
}

@media screen and (height <= 440px) and (orientation:landscape){

    .game{

        & .game-field-outer,
        & .game-field{
            aspect-ratio:2/1;
        }
        
    }
    
}

</style>