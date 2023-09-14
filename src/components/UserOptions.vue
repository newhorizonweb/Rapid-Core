


<template>

<div class="user-options">
    <p>Game Duration</p>

    <div class="time-buttons">
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
    </div>
</div>

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

.user-options{
    flex:1;
    width:100%;
    align-self:flex-start;
    position:relative;

    display:flex;
    justify-content:space-between;
    align-items:center;
    z-index:10;

    & .time-btn-current{
        background:linear-gradient(to bottom right,
            var(--accBg2a), var(--accBg2b)),
            url("../assets/img/noise-texture2.svg");

        &:before{
            background:linear-gradient(to bottom right,
                var(--accBorder2a), var(--accBorder2b));
        }
    }

    & .time-btn:disabled{
        filter:brightness(80%) !important;
        cursor:default;

        &:before{
            filter:brightness(80%) !important;
        }
    }

    & .time-buttons{
        display:flex;
        gap:var(--size4);
    }

}

</style>