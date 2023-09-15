


<template>
<div class="time-icon-svg">
<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><path class='cls-1' d='M160.6,71.2A78.7,78.7,0,1,1,75.4,36.8'/><path class='cls-1' d='M112.8,36.8a78.3,78.3,0,0,1,23.9,10.3'/><line class='cls-2' x1='60.8' y1='8' x2='127.4' y2='8'/><line class='cls-2' x1='161' y1='22.7' x2='184.6' y2='46.4'/><path class='cls-3' d='M48.5,119.2c3.7,28.6,33.9,48.9,65.2,35.6a41,41,0,0,0,22-21.9c13.3-31.3-7.1-61.5-35.7-65.3a5.4,5.4,0,0,0-6.1,5.3v34.3a5.8,5.8,0,0,1-5.9,5.9H53.7A5.3,5.3,0,0,0,48.5,119.2Z'/></svg>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "TimeIcon",
});
</script>


<style lang="scss">

.time-icon-svg{

    & .cls-1,.cls-2,.cls-3{fill:none;}.cls-1,.cls-2{stroke-linecap:round;stroke-linejoin:round;}.cls-2,.cls-3{stroke-miterlimit:10;}

    & *{
        stroke-width:12px;
        stroke:#FFF;
    }
    
}

</style>