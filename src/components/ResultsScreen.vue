


<template>

<div class="finish-screen" :class="{'fs-visible': finishScreen}">
    <div class="fs-inner">
        
        <div class="fs-time-btns"></div>
        <div class="fs-audio"></div>
        <div class="fs-music"></div>
    
        <br>

        <div v-if="newPB">
            <p>PERSONAL RECORD</p>
        </div>

        <p>Your score: {{ gameScore }}</p>
        <p>Score Per Second: {{ scorePerSecond.toFixed(2) }}</p>
        <br>

        <p>Total Clicks: {{ totalClicks }}</p>
        <p>Missed Clicks: {{ missedClicks }}</p>
        <br>

        <p>Accuracy: {{ (accuracy * 100).toFixed(2) }}%</p>
        <p>Clicks Per Second: {{ CPS.toFixed(2) }}</p>
        <br>

        <p>Lvl {{ currResLvl }} - {{ currResName }}</p>
        <p>{{ currResSize }}</p>
        <p>{{ currResLifespan }}</p>
        <p>{{ currResExamples }}</p>
        <p>{{ currResFunFact }}</p>
        <br>

        <slot name="start-btn"></slot>
        <br>

        <div class="personal-best" v-if="personalBestScores.length > 0">
            <div v-for="(pbScore, index) in personalBestScores" :key="index">
                <p>{{ pbScore.pb ? pbScore.pb : "---" }}</p>
                <p>{{ pbScore.pbSec ? pbScore.pbSec : "---"  }}</p>
            </div>
        </div>
        <br>
        <br>
        <br>

        <ScoreboardComp
            ref="saveResults"
            @pbScores="pbScores"

            :timeDuration="timeDuration"
            :gameScore="gameScore"
            :scorePerSecond="scorePerSecond"
            :accuracy="accuracy"
            :CPS="CPS" 
        />

        <CalcColors
            ref="CalcColors"
        />

    </div>
</div>

</template>



<script lang="ts">
import { defineComponent } from 'vue'
import ScoreboardComp from "./ScoreboardComp.vue"
import CalcColors from "./CalcColors.vue"

interface PersonalBestScore{
    pb: number;
    pbSec: number;
    uniqueIndex: number;
    firstGame: boolean;
}

export default defineComponent({
    name: "ResultsScreen",

    emits: [
        "resultsMounted"
    ],

    components: {
        ScoreboardComp, 
        CalcColors
    },

    data(){
        return{
            resultItems: [
                {
                    lvl: 6,
                    name: "Black Hole",
                    lifespan: "",
                    size: "",
                    examples: "",
                    funFacts: [
                        "",
                        "",
                        ""
                    ]
                },
                {
                    lvl: 5,
                    name: "Pulsar",
                    lifespan: "",
                    size: "",
                    examples: "",
                    funFacts: [
                        "",
                        "",
                        ""
                    ]
                },
                {
                    lvl: 4,
                    name: "Blue Giant",
                    lifespan: "",
                    size: "",
                    examples: "",
                    funFacts: [
                        "",
                        "",
                        ""
                    ]
                },
                {
                    lvl: 3,
                    name: "Red Giant",
                    lifespan: "",
                    size: "",
                    examples: "",
                    funFacts: [
                        "",
                        "",
                        ""
                    ]
                },
                {
                    lvl: 2,
                    name: "Yellow Dwarf",
                    lifespan: "",
                    size: "",
                    examples: "",
                    funFacts: [
                        "",
                        "",
                        ""
                    ]
                },
                {
                    lvl: 1,
                    name: "Red Dwarf",
                    lifespan: "10 days",
                    size: "1 km",
                    examples: "XxX",
                    funFacts: [
                        "FunFact1",
                        "FunFact2",
                        "FunFact3"
                    ]
                }

            ],

            currResItem: 0,
            randNum: 0,
            currResLvl: 0,
            currResName: "",
            currResLifespan: "",
            currResSize: "",
            currResExamples: "",
            currResFunFact: "",

            // Personal Best Scores
            personalBestScores: [] as PersonalBestScore[],
            scoreIndex: 0,
            newPB: false
        }
    },

    props:[
        "finishScreen",
        "timeDuration",
        "gameScore",
        "totalClicks"
    ],

    mounted(){
        this.$emit("resultsMounted");
    },

    methods:{

        resultInfo(didUserEnd: boolean){

            switch (true){
                case this.scorePerSecond >= 2.75:
                    this.currResItem = 0;
                    break;

                case this.scorePerSecond >= 2.25:
                    this.currResItem = 1;
                    break;

                case this.scorePerSecond >= 1.75:
                    this.currResItem = 2;
                    break;

                case this.scorePerSecond >= 1.25:
                    this.currResItem = 3;
                    break;

                case this.scorePerSecond >= 0.75:
                    this.currResItem = 4;
                    break;

                case this.scorePerSecond < 0.75:
                    this.currResItem = 5;
                    break;
            }

            type ResultItem = {
                lvl: number;
                name: string;
                lifespan: string;
                size: string;
                examples: string;
                funFacts: string[];
            };

            const currRes:ResultItem = this.resultItems[this.currResItem];

            // Level
            this.currResLvl = currRes.lvl;

            // Name
            this.currResName = currRes.name;

            // Lifespan
            this.currResLifespan = currRes.lifespan;

            // Size
            this.currResSize = currRes.size;

            // Examples
            this.currResExamples = currRes.examples;

            // Random Fun Fact
            this.randNum = Math.floor(Math.random() * 3);
            this.currResFunFact = currRes.funFacts[this.randNum];

            // Show the Personal Best scores
            (this.$refs.saveResults as InstanceType<typeof ScoreboardComp>).personalBest();

            // Remove game theme
            for (let i = 0; i < this.resultItems.length; i++){
                document.body.classList.remove("game-theme-lvl" + (i + 1));
            }
            document.body.classList.remove("game-theme-def");

            // Add game theme
            if (didUserEnd === false){
                // Level theme
                document.body.classList.add("game-theme-lvl" + this.currResLvl);
            } else {
                // Default theme
                document.body.classList.add("game-theme-def");
            }

            // Calculate variables in the CalcColors component
           (this.$refs.CalcColors as InstanceType<typeof CalcColors>).setVariables();

        },

        saveResults(){
            (this.$refs.saveResults as InstanceType<typeof ScoreboardComp>).saveResults();
        },

        pbScores(pbScoresArray: PersonalBestScore[]){
            
            this.personalBestScores = pbScoresArray;

            switch (this.timeDuration){
                case 10:
                    this.scoreIndex = 0;
                    break;
                case 30:
                    this.scoreIndex = 1;
                    break;
                case 60:
                    this.scoreIndex = 2;
                    break;
            }

            const currScores = this.personalBestScores[this.scoreIndex];

            // Check if it's a personal record, so if:
            // The current score is the highest in the scoreboard (current game duration)
            // It's unique, so the score must be better than the previous one
            // It's not a first game
            if (currScores.pb == this.gameScore &&
                currScores.uniqueIndex <= 1 &&
                currScores.firstGame === false){
                this.newPB = true;
            } else {
                this.newPB = false;
            }

        }
        
    },

    computed:{

        scorePerSecond(){
            return this.gameScore / this.timeDuration;
        },

        accuracy(){
            if (this.totalClicks){
                return this.gameScore / this.totalClicks;
            } else {
                return 0;
            }
        },
        
        CPS(){
            return this.totalClicks / this.timeDuration;
        },

        missedClicks(){
            return this.totalClicks - this.gameScore;
        }

    }

})
</script>



<style lang="scss">

.finish-screen{
    width:100vw;
    height:100vh;

    position:fixed;
    top:0;
    left:105%;

    background-color:rgb(0,0,0,0.3);
    transition:var(--trans3);
    overflow:auto;
    z-index:1000;

    &.fs-visible{
        left:0;
    }

}

</style>