


<template>

<div class="finish-screen" :class="{'fs-visible': finishScreen}">
    <div class="fs-inner">
        <div class="fs-content">
            
            <div class="finish-info">
                <h2 class="finish-section-heading fi-heading"
                    v-if="userFinished && !gamePlaying || windowResized">
                    Game Termination
                </h2>
                <h2 class="finish-section-heading fi-heading"
                    v-if="gameScore === 0 && !userFinished && !windowResized">
                    No Score
                </h2>

                <p class="fi-txt"
                    v-if="windowResized && !gamePlaying">
                    Game ended due to window resize.
                </p>

                <p class="fi-txt"
                    v-if="userFinished || windowResized || gameScore === 0">
                    Your results will not be saved.
                </p>
            </div>

            <div class="fs-lvl-info">
                <h2 class="personal-record-heading"
                    v-if="newPB">
                    PERSONAL RECORD
                </h2>

                <h3 class="finish-section-heading fs-lvl-heading"
                    v-if="currResLvl && currResName">
                    {{ currResName }}
                </h3>
                <h3 class="finish-section-heading fs-lvl-heading"
                v-else>
                    N/A
                </h3>

                <div class="lvl-cores">
                    <div class="lvl-core"></div>
                    <div class="lvl-core"></div>
                    <div class="lvl-core"></div>
                    <div class="lvl-core"></div>
                    <div class="lvl-core"></div>
                    <div class="lvl-core"></div>
                </div>
            </div>

            <div class="fs-btn-div">
                <slot name="start-btn"></slot>
            </div>
            
            <div class="finish-results">

                <h3 class="finish-section-heading">Results</h3>

                <div class="fr-section glass-border">
                    <p>Your Score: {{ gameScore }}</p>
                    <p>Score/Sec: {{ scorePerSecond.toFixed(2) }}</p>
                </div>

                <div class="fr-section glass-border">
                    <p>Total Clicks: {{ totalClicks }}</p>
                    <p>Missed Clicks: {{ missedClicks }}</p>
                </div>

                <div class="fr-section glass-border">
                    <p>CPS: {{ CPS.toFixed(2) }}</p>
                    <p>Accuracy: {{ (accuracy * 100).toFixed(2) }}%</p>
                </div>

            </div>

            <div class="personal-best" v-if="personalBestScores.length > 0">
                
                <h3 class="finish-section-heading">Personal Best</h3>

                <div class="pb-div glass-border"
                    v-for="(pbScore, index) in personalBestScores" 
                    :key="index">

                    <h4>{{ timeDurationArray[index] }}<span class="pb-time-span">s</span></h4>

                    <p>Score: {{ pbScore.pb ? pbScore.pb : "---" }}</p>
                    <p>Score/Sec: {{ pbScore.pbSec ? pbScore.pbSec : "---"  }}</p>

                </div>

            </div>

            <div class="core-intel"
                v-show="gameScore != 0">
                
                <h3 class="finish-section-heading">Core Intel</h3>

                <div class="ci-section ci-data glass-border">
                    <h4 class="ci-heading">Data</h4>

                    <div class="ci-elem">
                        <p class="ci-label">Object</p>
                        <p class="ci-txt">{{ currResName }}</p>
                    </div>

                    <div class="ci-elem">
                        <p class="ci-label">Diameter</p>
                        <p class="ci-txt">{{ currResSize }}</p>
                    </div>

                    <div class="ci-elem">
                        <p class="ci-label">Temperature</p>
                        <p class="ci-txt">{{ currResTemp }}</p>
                    </div>

                    <div class="ci-elem">
                        <p class="ci-label">Lifespan</p>
                        <p class="ci-txt">{{ currResLifespan }}</p>
                    </div>

                    <div class="ci-elem">
                        <p class="ci-label">Examples</p>
                        <p class="ci-txt">{{ currResExamples }}</p>
                    </div>
                </div>
                
                <div class="ci-section ci-fun-fact glass-border">
                    <h4 class="ci-heading">Fun Fact</h4>
                    <p class="ci-txt">{{ currResFunFact }}</p>
                </div>

            </div>

        </div>
    </div>

    <ScoreboardComp
        ref="saveResults"
        @pbScores="pbScores"

        :timeDuration="timeDuration"
        :gameScore="gameScore"
        :scorePerSecond="scorePerSecond"
        :accuracy="accuracy"
        :CPS="CPS" 
    />
</div>

<CalcColors
    ref="CalcColors"
/>

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

    components: {
        ScoreboardComp, 
        CalcColors
    },

    emits: [
        "resultsMounted"
    ],

    props:[
        "finishScreen",
        "gamePlaying",
        "duringMatch",
        "timeDuration",
        "gameScore",
        "totalClicks",
        "userFinished",
        "windowResized"
    ],

    data(){
        return{
            resultItems: [
                {
                    lvl:        "6",
                    name:       "Black Hole",
                    lifespan:   "10¹⁰ to 10¹⁰⁰ years",
                    size:       "10³ to 10⁶ km",
                    temp:       "~0 K",
                    examples:   "Sagittarius A*, Cygnus X-1",
                    funFacts: [
                        "Picture the entirety of Earth, with its vast oceans, towering mountains, and sprawling landscapes. Now, compress all of that into a sphere roughly the size of a ping pong ball. That's the staggering density at play when we talk about black holes.",

                        "Dare to approach a black hole, and you'd undergo a peculiar transformation. As the immense gravitational forces act differently on various parts of an object, it gets stretched into a long, thin form, reminiscent of spaghetti. A quirky name for a terrifying process!",

                        "Some black holes are like cosmic whirligigs, spinning almost at the speed of light. This astonishingly rapid rotation doesn't just stay localized; it drags the surrounding space-time in a phenomenon dubbed frame-dragging, altering the very fabric of the universe."
                    ]
                },
                {
                    lvl:        "5",
                    name:       "Pulsar",
                    lifespan:   "10⁶ to 10⁷ years",
                    size:       "10 to 30 km",
                    temp:       "~10⁶ K",
                    examples:   "Crab Pulsar, Vela Pulsar",
                    funFacts: [
                        "Some pulsars are true speed demons! They can rotate hundreds of times per second. To put that into perspective, it's as if an object several kilometers across is spinning faster than the blades of a kitchen blender. This incredible rotation is a testament to the extraordinary physics at play.",

                        "Pulsars are some of the universe's most accurate clocks. Their pulses are so regular that, in some cases, they rival the accuracy of atomic clocks on Earth. Astronomers can use this trait to test theories of gravity, study the interstellar medium, and even hunt for gravitational waves.",

                        "Pulsars are the remnants of massive stars that exploded in spectacular supernovae. After such a stellar death, the core collapses, and if it doesn't become a black hole, it transforms into a densely packed neutron star. As it retains the angular momentum of the original star, it spins rapidly, giving birth to a pulsar."
                    ]
                },
                {
                    lvl:        "4",
                    name:       "Blue Giant",
                    lifespan:   "10⁶ to 10⁷ years",
                    size:       "7×10⁶ to 1.4×10⁷ km",
                    temp:       "20 000 to 50 000 K",
                    examples:   "Rigel, Spica",
                    funFacts: [
                        "Due to their immense mass and rapid consumption of fuel, many blue giants meet their end in dramatic supernova explosions. These cosmic detonations can outshine entire galaxies and lead to the birth of neutron stars or black holes. The remnants of these explosions scatter essential elements throughout space, contributing to the cosmic cycle of life and death.",

                        "These giants radiate immense energy, illuminating their cosmic neighborhoods. Their dazzling luminosity can outshine hundreds of thousands of Suns, casting a luminous glow that influences the fate of nearby planets and star systems.",

                        "The intense radiation and stellar winds from blue giants can trigger star formation in nearby gas clouds. While their lives might be relatively short in cosmic terms, their influence is profound, shaping the structure and evolution of their resident galaxies. In a sense, they're both creators and destroyers in the cosmic drama."
                    ]
                },
                {
                    lvl:        "3",
                    name:       "Red Giant",
                    lifespan:   "10⁸ to 10⁹ years",
                    size:       "10⁸ to 10⁹ km",
                    temp:       "3 500 to 5 000 K",
                    examples:   "Arcturus, Aldebaran",
                    funFacts: [
                        "Imagine the Sun expanding so much that it swallows Mercury, Venus, and even reaches close to Earth! That's the kind of dramatic growth stars undergo as they transition into red giants. These engorged stars are living on borrowed time, having exhausted their primary hydrogen fuel.",

                        "As red giants near the end of their lifespans, they often cast off their outer layers in beautiful, intricate patterns, creating what we observe as planetary nebulae. These nebulae, enriched with the heavy elements forged within the star, can be the birthplaces for subsequent generations of stars and potentially life-bearing planets.",

                        "Eventually, red giants exhaust their nuclear fuel and undergo a different fate than blue giants. They may collapse into white dwarfs, which are incredibly dense remnants. This transition is a crucial step in the lifecycle of stars, highlighting the incredible diversity of cosmic destinies."
                    ]
                },
                {
                    lvl:        "2",
                    name:       "Yellow Dwarf",
                    lifespan:   "10⁹ to 10¹⁰ years",
                    size:       "0.8×10⁶ to 1.5×10⁶ km",
                    temp:       "5 000 to 6 000 K",
                    examples:   "Sun, Alpha Centauri A",
                    funFacts: [
                        "Yellow dwarfs, like our Sun, produce solar winds, flares, and sunspots due to magnetic activity. These phenomena can influence the space weather around planets in their system, affecting everything from auroras on planets to the health of satellites and astronauts.",

                        "Their consistent output and long life make yellow dwarfs ideal candidates for planets with life. They offer a 'Goldilocks' condition - not too hot and not too cold - for planets in their habitable zones, making them prime targets in the search for extraterrestrial life.",

                        "Even though they're called 'yellow' dwarfs, these stars can range in color from yellow to white. The specific shade is an indicator of the star's surface temperature. The color 'yellow' in the name is more about its average hue than a strict descriptor."
                    ]
                },
                {
                    lvl: "1",
                    name: "Red Dwarf",
                    lifespan: "10¹⁰ to 10¹³ years",
                    size: "0.1×10⁶ to 0.6×10⁶ km",
                    temp: "2 500 to 4 000 K",
                    examples: "Proxima Centauri, Barnard's Star",
                    funFacts: [
                        "Though they're dim and not easily visible to the naked eye from Earth, red dwarfs are the most abundant type of star in the universe, making up about 70-80% of all stars in our Milky Way galaxy.",

                        "Recent exoplanet discoveries show that many red dwarfs host planetary systems. Some of these exoplanets lie within their star's habitable zone, where conditions might be right for liquid water. However, the star's flare activity and tidal forces pose unique challenges for the potential of life on these worlds.",

                        "Red dwarfs are fully convective, meaning that they transport heat from their cores to their surfaces through rising and falling currents, much like boiling water in a pot. This convection process remixes their entire contents, allowing them to burn nearly all their hydrogen fuel, adding to their long life span."
                    ]
                }

            ],

            currResItem: 0,
            randNum: 0,

            // Result Info (Core Intel)
            currResLvl: "N/A",
            currResName: "",
            currResLifespan: "",
            currResSize: "",
            currResTemp: "",
            currResExamples: "",
            currResFunFact: "",

            // Personal Best Scores
            personalBestScores: [] as PersonalBestScore[],
            timeDurationArray: [
                "10",
                "30",
                "60"
            ],
            scoreIndex: 0,
            newPB: false
        }
    },

    mounted(){
        this.$emit("resultsMounted");
    },

    methods:{

        resultInfo(didUserEnd: boolean){

            if (this.gameScore > 0){

                switch (true){
                    case this.scorePerSecond >= 2:
                        this.currResItem = 0;
                        break;

                    case this.scorePerSecond >= 1.75:
                        this.currResItem = 1;
                        break;

                    case this.scorePerSecond >= 1.5:
                        this.currResItem = 2;
                        break;

                    case this.scorePerSecond >= 1.25:
                        this.currResItem = 3;
                        break;

                    case this.scorePerSecond >= 1:
                        this.currResItem = 4;
                        break;

                    case this.scorePerSecond < 1:
                        this.currResItem = 5;
                        break;
                }

                type ResultItem = {
                    lvl: string;
                    name: string;
                    lifespan: string;
                    size: string;
                    temp: string;
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

                // Temperature
                this.currResTemp = currRes.temp;

                // Examples
                this.currResExamples = currRes.examples;

                // Random Fun Fact
                this.randNum = Math.floor(Math.random() * 3);
                this.currResFunFact = currRes.funFacts[this.randNum];

            } else {
                this.currResLvl = "";
                this.currResName = "";
                this.currResLifespan = "";
                this.currResSize = "";
                this.currResTemp = "";
                this.currResExamples = "";
                this.currResFunFact = "";
            }

            // Level
            const lvlCores = document.querySelectorAll(".lvl-core");

            lvlCores.forEach((lvlCore) => {
                lvlCore.classList.remove("lvl-core-active");
            });

            for (let i = 0; i < parseInt(this.currResLvl); i++){
                lvlCores[i].classList.add("lvl-core-active");
            }

            // Show the Personal Best scores
            (this.$refs.saveResults as InstanceType<typeof ScoreboardComp>).personalBest();

            // Remove game theme
            for (let i = 0; i < this.resultItems.length; i++){
                document.body.classList.remove("game-theme-lvl" + (i + 1));
            }
            document.body.classList.remove("game-theme-def");

            // Add game theme
            if (didUserEnd === false && 
                this.gameScore > 0){
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

        },

        closeScoreboard(){
            (this.$refs.saveResults as InstanceType<typeof ScoreboardComp>).closeScoreboard();
        },
        
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

    /* Finish Screen */

.finish-screen{
    width:100%;
    height:100%;
 
    position:absolute;
    top:0;
    left:105%;

    border-radius:var(--size4);
    transition:var(--trans3);
    cursor:auto;
    z-index:1000;

    &.fs-visible{
        left:0;
    }

    & .fs-inner{
        width:calc(100% - ((var(--size3) - var(--scrollBar)) * 2));
        height:calc(100% - (var(--size6) * 2));

        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);

        scrollbar-gutter:stable both-edges;
        transition:var(--trans3);
        overflow:auto;

        &::-webkit-scrollbar-track{
            background:transparent;
        }

    }

    &:has(.stats-visible) .fs-inner{
        opacity:0;
    }

}

        /* Finish Screen - Heading */

.finish-section-heading:not(.fs-lvl-heading){
    width:100%;
    margin-top:var(--size6);
    text-align:center;
    text-wrap:balance;
}



    /* Finish Screen - Content */

.fs-content{
    padding:0 var(--size3);
    display:flex;
    flex-direction:column;
    gap:var(--size6);

        /* Info */

    & .finish-info{

        &:not(:has(.fi-heading)){
            display:none;
        }

        & *{
            text-align:center;
        }

        & .fi-heading{
            margin-bottom:var(--size1);
        }

        & .fi-txt{
            text-wrap:balance;
        }

    }

    & .fs-lvl-info{
        margin-top:var(--size6);
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:var(--size3);

        & .personal-record-heading{
            width:100%;
            margin-bottom:var(--size6);
            text-align:center;
        }

        & .lvl-cores{
            width:min(400px, 100%);
            display:flex;
            gap:var(--size3);

            & .lvl-core{
                flex:1;
                aspect-ratio:1/1;
                position:relative;

                border-radius:50%;
                overflow:hidden;

                &:after{
                    content:"";
                    width:100%;
                    height:100%;

                    position:absolute;
                    top:0;
                    left:0;

                    background:linear-gradient(to right,
                        var(--mainBg1a), var(--mainBg1b));
                    border-radius:50%;
                    filter:blur(5px) brightness(700%);
                    
                    transition:var(--trans2);
                }

                &.lvl-core-active:after{
                    background:linear-gradient(to right,
                        var(--mainColor), var(--accColor));
                    filter:blur(5px);
                }

                .fs-visible &{
                    animation:finCoreAnim 1.5s ease-out;

                    &:after{
                        animation:coreRotate 5s linear infinite;
                    }

                }

                @keyframes finCoreAnim{
                    0%{
                        scale:0;
                    }
                    10%{
                        scale:1.2;
                    }
                    25%{
                        scale:0.85;
                    }
                    50%{
                        scale:1.1;
                    }
                    100%{
                        scale:1;
                    }
                }

            }

        }

    }

    & .fs-btn-div{
        width:100%;
        display:flex;
        justify-content:center;

        & .rs-start-btn{
            width:min(400px, 100%);
            padding:var(--size6);
            border-radius:var(--size4);

            &:before{
                border-radius:var(--size4);
            }

        }

    }

        /* Results */

    & .finish-results,
    & .personal-best{
        display:flex;
        flex-wrap:wrap;
        gap:var(--size6);

        & .fr-section,
        & .pb-div{
            flex:35%;
            padding:var(--size6);

            display:flex;
            flex-direction:column;
            align-items:center;
            gap:var(--size1);

            background:linear-gradient(to bottom right,
                var(--mainBg2a), var(--mainBg2b)),
                url("../assets/img/noise-texture2.svg");
            background-position:center;
            background-repeat:no-repeat;
            background-size:cover;

            &:before{
                background:linear-gradient(to bottom right,
                    var(--mainBorder2a), var(--mainBorder2b));
                border-radius:var(--size4);
            }

            & p{
                text-align:center;
                text-wrap:balance;
            }

        }

        & .pb-div{
            flex:26%;

            & .pb-time-span{
                font-size:20px;
            }

        }

        & .fr-section:nth-of-type(1){
            flex:100%;
        }

    }

        /* Core Intel */

    & .core-intel{
        display:flex;
        flex-wrap:wrap;
        gap:var(--size6);

        & .ci-section{
            flex:1;
            padding:var(--size6);

            display:flex;
            flex-direction:column;
            gap:var(--size3);

            background:linear-gradient(to bottom right,
                var(--mainBg2a), var(--mainBg2b)),
                url("../assets/img/noise-texture2.svg");
            background-position:center;
            background-repeat:no-repeat;
            background-size:cover;

            &:before{
                background:linear-gradient(to bottom right,
                    var(--mainBorder2a), var(--mainBorder2b));
                border-radius:var(--size4);
            }

            & .ci-heading{
                width:100%;
                margin-bottom:var(--size6);
                text-align:center;
                text-wrap:balance;
            }

            & .ci-elem{
                display:flex;
                flex-direction:column;
                gap:2px;
            }

            & .ci-label{
                font-size:14px;
                color:var(--txt-faded2);
            }

            & .ci-txt{
                text-wrap:balance;
            }

        }

    }

}

    /* Media */

@media screen and (width <= 768px){
    
    .fs-content{

        & .finish-results,
        & .personal-best{

            & .fr-section,
            & .pb-div{
                flex:100%;
            }

        }

        & .core-intel{

            & .ci-section{
                flex:100%;
            }

        }

    }

}

@media screen and (width <= 540px){

    .fs-content{

        & .finish-info{

            & .fi-heading{
                margin-top:calc(var(--size8) + var(--size2));
            }

        }

        &:not(:has(.fi-heading)) .fs-lvl-info{
            margin-top:calc(var(--size8) + var(--size2));
        }

    } 

    h2.finish-section-heading{
        font-size:6vw;
    }

    h3.finish-section-heading{
        font-size:5.5vw;
    }

}

</style>