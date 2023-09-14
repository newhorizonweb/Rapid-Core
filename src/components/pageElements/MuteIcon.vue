


<template>
<div class="mute-icon-svg">
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path class="cls-1 sound-main-elem" d="M54.7,143.7H31.6A23.5,23.5,0,0,1,8.2,120.2V79.8A23.5,23.5,0,0,1,31.6,56.3H54.7"/><path class="cls-1 sound-main-elem" d="M111.1,178.8a13,13,0,0,1-16.2,12.7c-6.2-1.7-12.9-5.6-21.7-14.3a63.8,63.8,0,0,1-13-18.3,60.5,60.5,0,0,1-5.5-25.4v-67a60.5,60.5,0,0,1,5.5-25.4,63.8,63.8,0,0,1,13-18.3c8.5-8.5,15.1-12.4,21.2-14.2a13.1,13.1,0,0,1,16.7,12.6Z"/><path class="cls-1 sound-path-elem sound-path-elem2" d="M143.1,57.9a58.4,58.4,0,0,1,0,84.3"/><path class="cls-1 sound-path-elem sound-path-elem1" d="M159,23.1a106.3,106.3,0,0,1,0,153.8"/></svg>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "MuteIcon",
});
</script>

<style lang="scss">

.mute-icon-svg{

    & .cls-1{stroke-linecap:round;stroke-linejoin:round;}

    & *{
        fill:rgb(0,0,0,0);
        stroke:#FFF;
        stroke-width:16px;
    }

}

.mute-lvl1{

    & :is(.sound-main-elem, .sound-path-elem2){
        transform:translate(15px, 0);
    }

    & .sound-path-elem1{
        opacity:0;
    }

}

.mute-lvl2{

    & .sound-main-elem{
        transform:translate(30px, 0);
    }

    & :is(.sound-path-elem1, .sound-path-elem2){
        opacity:0;
    }

}

.muted-icon-active{

    & .sound-main-elem{
        transform:translate(30px, 0);
    }

    & .sound-path-elem{
        opacity:0;
    }

}

</style>