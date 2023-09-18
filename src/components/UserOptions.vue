


<template>

<div class="user-options">
    <p class="uo-label">Game Duration</p>

    <div class="time-buttons">
        <button class="time-btn glass-btn time-btn-current"
            @click="setTimeDur"
            :disabled="duringMatch"
            runTime="10">
            <p>10s</p>
        </button>
        <button class="time-btn glass-btn"
            @click="setTimeDur"
            :disabled="duringMatch"
            runTime="30">
            <p>30s</p>
        </button>
        <button class="time-btn glass-btn" 
            @click="setTimeDur"
            :disabled="duringMatch"
            runTime="60">
            <p>60s</p>
        </button>
    </div>
</div>

</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "UserOptions",

    emits: [
        "timerIsSet"
    ],

    props:[
        "duringMatch",
        "resultsMounted"
    ],

    data(){
        return{
            timeDuration: 10
        }
    },

    methods:{

        setTimeDur($event: Event){
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

    & .time-btn{

        &.time-btn-current{

            &:before{
                background:linear-gradient(to bottom right,
                    var(--accBorder2a), var(--accBorder2b));
            }

            &:after{
                opacity:1;
            }

        }

        &:after{
            content:"";
            width:100%;
            height:100%;

            position:absolute;
            top:0;
            left:0;

            background:linear-gradient(to bottom right,
                var(--accBg2a), var(--accBg2b)),
                url("../assets/img/noise-texture2.svg");
            border-radius:var(--size2);

            opacity:0;
            transition:var(--trans2);
        }

        & p{
            position:relative;
            line-height:1;
            z-index:100;
            pointer-events:none;
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