


<template>

<button v-if="showSbBtn" @click="showScoreboard = !showScoreboard">
    [ Scoreboard ]
</button>

<div class="scoreboards" v-show="showScoreboard && showSbBtn">

    <button @click="clearScoreboard">Clear Scoreboard</button>

    <h3>Scoreboard</h3>

    <div v-for="scoreboard in scoreboardsFilter" :key="scoreboard.name">
        <h4>{{ scoreboard.name }}</h4>

        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Score</th>
                    <th>Score/sec</th>
                    <th>Accuracy</th>
                    <th>Clicks/Sec</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(data, index) in scoreboard.data" :key="data.score">
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.score }}</td>
                    <td>{{ data.sps }}</td>
                    <td>{{ data.accuracy }}%</td>
                    <td>{{ data.cps }}</td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <th colspan="5">Average</th>
                </tr>
                <tr>
                    <th></th>
                    <th>Score</th>
                    <th>Score/sec</th>
                    <th>Accuracy</th>
                    <th>Clicks/Sec</th>
                </tr>
                <tr>
                    <td></td>
                    <td>{{ scoreboard.averages.score.toFixed(2) }}</td>
                    <td>{{ scoreboard.averages.sps.toFixed(2) }}</td>
                    <td>{{ scoreboard.averages.accuracy.toFixed(2) }}%</td>
                    <td>{{ scoreboard.averages.cps.toFixed(2) }}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>

</template>



<script lang="ts">
import { defineComponent } from 'vue'

// Scoreboard types
type scoreboardTypes = {
    score: string; 
    sps: string;
    accuracy: string;
    cps: string;
};

export default defineComponent({
    name: "ScoreboardComp",

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
                name: "10 seconds", 
                data: this.getScoreboard('scoreboardA'), 
                averages: this.avgScore(this.getScoreboard('scoreboardA'))},

                {id: "B",
                name: "30 seconds", 
                data: this.getScoreboard('scoreboardB'), 
                averages: this.avgScore(this.getScoreboard('scoreboardB'))},

                {id: "C",
                name: "60 seconds", 
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

.scoreboards{
    background-color:white;
}

th, td{
    padding:4px 8px;
}

</style>