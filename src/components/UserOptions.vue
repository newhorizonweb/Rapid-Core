


<template>

<h1>Rapid Core</h1>

<p>Choose the time duration</p>
    
<button class="time-btn time-btn-current" @click="setTimeDur(10, $event)">10s</button>
<button class="time-btn" @click="setTimeDur(30, $event)">30s</button>
<button class="time-btn" @click="setTimeDur(60, $event)">60s</button>

</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'UserOptions',

    data(){
        return{
            timeDuration: 10
        }
    },

    methods:{

        setTimeDur(runTime: number, $event: Event){

            // Set the duration time
            this.timeDuration = runTime

            // Remove the class from all buttons
            const buttons = document.querySelectorAll('.time-btn')
            buttons.forEach(function(button){
                (button as HTMLElement).classList.remove('time-btn-current')
            });

            // Add the class to the clicked button
            ($event.target as HTMLElement).classList.add('time-btn-current')

            this.$emit("timerIsSet", this.timeDuration)
        }

    }

})
</script>



<style lang="scss">



</style>