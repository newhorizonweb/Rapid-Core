


<template>

<button class="stats-btn glass-btn"
    :class="{'close-stats': showScoreboard}"
    v-if="showSbBtn" 
    @click="showScoreboard = !showScoreboard">
    <StatsIcon />
</button>

<div class="scoreboards" 
    :class="{'stats-visible': showScoreboard && showSbBtn}"
    ref="scoreboardsElem">
    <div class="scoreboards-inner">

        <div class="clear-stats-div">
            <button class="clear-stats-btn glass-btn"
                @click="clearScoreboard">
                Clear Stats
            </button>
        </div>

        <div class="stats-section"
            v-for="scoreboard in scoreboardsFilter" 
            :key="scoreboard.name">

            <h3 class="table-heading">
                {{ scoreboard.name }}<span class="th-span">s</span>
            </h3>

            <div class="stats-tables">
                <table class="stats-table glass-border">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Score</th>
                            <th>Score/Sec</th>
                            <th>CPS</th>
                            <th>Accuracy</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(data, index) in scoreboard.data" :key="data.score">
                            <td>{{ index + 1 }}.</td>
                            <td>{{ data.score }}</td>
                            <td>{{ data.sps }}</td>
                            <td>{{ data.cps }}</td>
                            <td>{{ data.accuracy }}%</td>
                        </tr>
                    </tbody>
                </table>

                <table class="stats-table avg-table glass-border">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Score</th>
                            <th>Score/Sec</th>
                            <th>CPS</th>
                            <th>Accuracy</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>AVG</td>
                            <td>{{ scoreboard.averages.score.toFixed(2) }}</td>
                            <td>{{ scoreboard.averages.sps.toFixed(2) }}</td>
                            <td>{{ scoreboard.averages.cps.toFixed(2) }}</td>
                            <td>{{ scoreboard.averages.accuracy.toFixed(2) }}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</div>

</template>



<script lang="ts">
import { defineComponent } from 'vue'
import StatsIcon from "./pageElements/StatsIcon.vue"

// Scoreboard types
type scoreboardTypes = {
    score: string; 
    sps: string;
    accuracy: string;
    cps: string;
};

export default defineComponent({
    name: "ScoreboardComp",

    components: {
        StatsIcon
    },

    emits: [
        "pbScores"
    ],

    data(){
        return{
            ping: 0,
            showScoreboard: false,
            showSbBtn: false,

            // Personal Best Scores
            personalBestScores: [
                { pb: 0 as number, pbSec: 0 as number,
                uniqueIndex: 0 as number, firstGame: false as boolean },

                { pb: 0 as number, pbSec: 0 as number,
                uniqueIndex: 0 as number, firstGame: false as boolean },

                { pb: 0 as number, pbSec: 0 as number, 
                uniqueIndex: 0 as number, firstGame: false as boolean },
            ]
        }
    },

    props:[
        "timeDuration",
        "gameScore",
        "scorePerSecond",
        "accuracy",
        "CPS"
    ],

    mounted(){

        // Table Heading Position
        const sbElem: HTMLElement = this.$refs.scoreboardsElem as HTMLElement;

        window.addEventListener("resize", ()=> {
            this.headingPosition(sbElem);
        });
        sbElem.addEventListener("scroll", ()=> {
            this.headingPosition(sbElem);
        });

    },

    methods:{

            /* Tool Functions */

        checkTimeDuration(){
            let sbName = "";

            switch (this.timeDuration){
                case 10:
                    sbName = "scoreboardA";
                    break;
                case 30:
                    sbName = "scoreboardB";
                    break;
                case 60:
                    sbName = "scoreboardC";
                    break;
            }

            return sbName;
        },

        getScoreboard(sbName: string){
            return localStorage.getItem(sbName) ? JSON.parse(localStorage.getItem(sbName) as string) : [];
        },

        closeScoreboard(){
            this.showScoreboard = false;
        },

        headingPosition(sbElem: HTMLElement){

            // Data
            const scrollOffset = sbElem.scrollLeft;
            const widthOffset = sbElem.offsetWidth;
            const tableWidth = (document.querySelectorAll('.stats-table')[0] as HTMLElement).offsetWidth;

            // Calculate heading's new position
            const centerOffset = (tableWidth - widthOffset);
            const scrollPercentage = scrollOffset / centerOffset;
            const newPosition = (tableWidth - widthOffset) * scrollPercentage;

            // Set the new position
            document.querySelectorAll(".table-heading").forEach((heading) => {
                (heading as HTMLElement).style.transform = `translateX(${newPosition}px)`;
            });

        },

            /* Calculate Scores */

        avgScore(scoreboard: scoreboardTypes[]) {
            const totalGames = scoreboard.length;
            if (totalGames === 0) return null;

            const total = scoreboard.reduce((all, game) => {
                all.score += parseFloat(game.score);
                all.sps += parseFloat(game.sps);
                all.accuracy += parseFloat(game.accuracy);
                all.cps += parseFloat(game.cps);

                return all;
            }, { score: 0, sps: 0, accuracy: 0, cps: 0 });

            return {
                score: total.score / totalGames,
                sps: total.sps / totalGames,
                accuracy: total.accuracy / totalGames,
                cps: total.cps / totalGames
            };
        },

        personalBest(){

            this.scoreboards.forEach((scoreboard, index) => {
                if (scoreboard.data.length > 0){

                    this.showSbBtn = true;

                    // Check for the max score
                    const maxScore:number = Math.max(...scoreboard.data.map((obj: { score: string }) => obj.score));
                    const maxScoreSec:number = Math.max(...scoreboard.data.map((obj: { sps: string }) => obj.sps));
                    const uniqueIndex:number = scoreboard.data.filter((item: any) => item.score === maxScore).length;

                    // Check if it's a first game, so the "new record" isn't displayed if it is
                    let firstGame = false;
                    if (scoreboard.data.length <= 1){
                        firstGame = true;
                    }

                    // Set the pb values
                    this.personalBestScores[index].pb = maxScore;
                    this.personalBestScores[index].pbSec = maxScoreSec;
                    this.personalBestScores[index].uniqueIndex = uniqueIndex;
                    this.personalBestScores[index].firstGame = firstGame;
                }
            });

            this.$emit("pbScores", this.personalBestScores);

        },

            /* Save Results */

        saveResults(){
            const sbName: string = this.checkTimeDuration();

            // Get the correct scoreboard
            const scoreboard = localStorage.getItem(sbName) ? JSON.parse(localStorage.getItem(sbName) as string) : [];

            // Create an object with the score
            const newScore = {
                score: this.gameScore,
                sps: this.scorePerSecond.toFixed(2),
                accuracy: (this.accuracy * 100).toFixed(2),
                cps: this.CPS.toFixed(2)
            }

            // Push the new score object to the array
            scoreboard.push(newScore);

            // Save the updated scoreboard
            localStorage.setItem(sbName, JSON.stringify(scoreboard));

            // Send a ping to update scoreboards
            this.ping++

            // Set the personal best score
            this.personalBest();
        },
        
            /* Clear Scoreboard */

        clearScoreboard(){
            // Hide scoreboard and its button
            this.showSbBtn = false;
            this.showScoreboard = false;

            // Remove data from the localStorage
            this.scoreboards.forEach((scoreboard, index) => {
                localStorage.removeItem("scoreboard"+scoreboard.id);
            });

            // Reset personal best scores
            this.personalBestScores = this.personalBestScores.map(() => ({
                pb: 0,
                pbSec: 0,
                uniqueIndex: 0,
                firstGame: false
            }));

            // Send the cleared pb scores to the Results Screen
            this.$emit("pbScores", this.personalBestScores);

            // Send a ping to update scoreboards
            this.ping++
        }

    },

    computed:{

        scoreboards(){

            // Ping to calculate the function
            // Since the reactive values are in the parent component
            this.ping ? 0 : 0;

            const allScoreboards = [
                {id: "A",
                name: "10", 
                data: this.getScoreboard('scoreboardA'), 
                averages: this.avgScore(this.getScoreboard('scoreboardA'))},

                {id: "B",
                name: "30", 
                data: this.getScoreboard('scoreboardB'), 
                averages: this.avgScore(this.getScoreboard('scoreboardB'))},

                {id: "C",
                name: "60", 
                data: this.getScoreboard('scoreboardC'), 
                averages: this.avgScore(this.getScoreboard('scoreboardC'))}
            ];

            return allScoreboards;

        },

        scoreboardsFilter(){
            // Return only the scoreboards that are not empty
            return this.scoreboards.filter(scoreboard => scoreboard.data.length > 0);
        }

    }

})
</script>



<style lang="scss">

    /* Stats Section */

.stats-btn{
    position:absolute !important;
    top:var(--size6);
    right:var(--size6);
    z-index:1200;

    & div{
        width:var(--size5);
        height:var(--size5);
    }

}

.scoreboards{
    width:calc(100% - ((var(--size3) - var(--scrollBar)) * 2));
    height:calc(100% - (var(--size6) * 2));

    position:absolute;
    top:50%;
    left:155%;
    transform:translate(-50%, -50%);

    scrollbar-gutter:stable both-edges;
    overflow:auto;
    transition:var(--trans3);
    z-index:1000;

    &::-webkit-scrollbar-track{
        background:transparent;
    }

    &.stats-visible{
        left:50%;
    }

    & .clear-stats-div{
        padding:0 var(--size2);
    }

}

    /* Stats Tables */

.scoreboards-inner{
    display:flex;
    flex-direction:column;
    gap:var(--size6);

    & .table-heading{
        width:100%;
        margin-top:var(--size6);
        margin-bottom:var(--size3);

        text-align:center;
        text-wrap:balance;
        transition:translate 0s;

        & .th-span{
            font-size:20px;
        }

    }

    & .stats-tables{
        width:100%;
        min-width:520px;
        padding-right:calc(var(--size3) + (var(--scrollBar) / 2));
        padding-left:calc(var(--size3) - (var(--scrollBar) / 2));
    }

    & .stats-table{
        width:100%;
        padding:var(--size6);

        background:linear-gradient(to bottom right,
            var(--mainBg2a), var(--mainBg2b)),
            url("../assets/img/noise-texture2.svg");
        background-position:center;
        background-repeat:no-repeat;
        background-size:cover;

        table-layout:fixed;
        border-collapse:separate;
        border-spacing:0;

        &:before{
            background:linear-gradient(to bottom right,
                var(--mainBorder2a), var(--mainBorder2b));
            border-radius:var(--size4);
        }

        &.avg-table{
            margin-top:var(--size3);
        }

        & tbody tr:nth-child(2n + 1){
            background-color:rgb(0,0,0,0.3);

            & td:nth-child(1){
                border-radius:var(--size2) 0 0 var(--size2);
            }
            
            & td:nth-last-child(1){
                border-radius:0 var(--size2) var(--size2) 0;
            }

        }

        & th,
        & td{
            width:25%;
            padding:var(--size2);
            text-align:center;
            line-height:1;

            &:nth-child(1){
                min-width:75px !important;
                width:75px !important;
            }

        }

        & th{
            color:var(--txt1);
        }

    }

}

    /* Media */

@media screen and (width <= 768px){

    .scoreboards-inner{
    
        & .stats-table{

            & th,
            & td{
                padding:var(--size1);
                font-size:16px;

                &:nth-child(1){
                    min-width:70px !important;
                    width:70px !important;
                }

            }

        }

    }

}

@media screen and (width <= 320px){

    .scoreboards{

        & .clear-stats-div{
            padding-top:calc(var(--size8) + var(--size2));

            & .clear-stats-btn{
                width:100%;
            }

        }

    }

}

</style>