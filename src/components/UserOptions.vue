


<template>

<h1>Rapid Core</h1>
<p>Choose the time duration</p>

<button class="time-btn time-btn-current"
    @click="setTimeDur"
    :disabled="!firstGame"
    runTime="10">
    10s
</button>
<button class="time-btn"
    @click="setTimeDur"
    :disabled="!firstGame"
    runTime="30">
    30s
</button>
<button class="time-btn" 
    @click="setTimeDur"
    :disabled="!firstGame"
    runTime="60">
    60s
</button>

<teleport to=".fs-time-btns" v-if="resultsMounted">
    <button class="time-btn time-btn-current"
        @click="setTimeDur"
        runTime="10">
        10s
    </button>
    <button class="time-btn"
        @click="setTimeDur"
        runTime="30">
        30s
    </button>
    <button class="time-btn" 
        @click="setTimeDur"
        runTime="60">
        60s
    </button>
</teleport>

</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "UserOptions",

    emits: [
        "timerIsSet"
    ],

    props:[
        "firstGame",
        "resultsMounted"
    ],

    data(){
        return{
            timeDuration: 10
        }
    },

    methods:{

        setTimeDur($event: Event) {
            // Set the duration time
            this.timeDuration = Number(($event.target as HTMLElement).getAttribute("runTime"));

            const buttons = document.querySelectorAll('.time-btn');
            buttons.forEach(function(button){
                (button as HTMLElement).classList.remove('time-btn-current');
            });

            // Add the class to the clicked button and its counterpart
            const selBtns = document.querySelectorAll(`.time-btn[runTime="${this.timeDuration}"]`);
            selBtns.forEach(function(btn){
                (btn as HTMLElement).classList.add('time-btn-current');
            });

            this.$emit("timerIsSet", this.timeDuration);
        }

    }

})
</script>



<style lang="scss">

.time-btn{

    &.time-btn-current{
        border-color:blue;
    }

}

</style>