


<template>
<div class="finish-screen" :class="{'fs-visible': finishScreen}">
    <div class="fs-time-btns"></div>

    <p>Your score: {{ gameScore }}</p>
    <p>Score Per Second: {{ scorePerSecond.toFixed(2) }}</p>
    <p>Accuracy: {{ (accuracy * 100).toFixed(2) }}%</p>
    <p>Clicks Per Second: {{ CPS.toFixed(2) }}</p>

    <p>{{ currResName }}</p>
    <p>{{ currResSize }}</p>
    <p>{{ currResLifespan }}</p>
    <p>{{ currResExamples }}</p>
    <p>{{ currResFunFact }}</p>

    <slot name="start-btn"></slot>
</div>
</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ResultsScreen',

    data(){
        return{
            resultItems: [
                {
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
                    name: "Red Dwarf",
                    lifespan: "10 days",
                    size: "1 km",
                    examples: "XxX",
                    funFacts: [
                        "FunFact1",
                        "FunFact2",
                        "FunFact3"
                    ]
                },

            ],
            currResItem: 0,
            randNum: 0,
            currResName: "",
            currResLifespan: "",
            currResSize: "",
            currResExamples: "",
            currResFunFact: ""
        }
    },

    props:[
        "finishScreen",
        "timeDuration",
        "gameScore",
        "totalClicks"
    ],

    methods:{

        resultInfo(){

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
                name: string;
                lifespan: string;
                size: string;
                examples: string;
                funFacts: string[];
            };

            const currRes:ResultItem = this.resultItems[this.currResItem];

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
        }

    }

})
</script>



<style lang="scss">

.finish-screen{
    width:400px;
    height:300px;

    position:absolute;
    top:50%;
    left:105%;
    transform:translate(0, -50%);

    background-color:#DDD;
    transition:0.5s;
    z-index:100;

    &.fs-visible{
        animation:fsFade 0.5s ease-in forwards;
    }

    @keyframes fsFade{
        0%{
            left:105%;
            transform:translate(0, -50%);
        }
        100%{
            left:50%;
            transform:translate(-50%, -50%);
        }
    }

}

</style>