


<template>
<div class="score-icon-svg">
<svg id='Layer_2' data-name='Layer 2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><path class='cls-1' d='M39.7,76.2A65.5,65.5,0,0,1,76.2,39.7'/><path class='cls-1' d='M76.2,160.3a65.5,65.5,0,0,1-36.5-36.5'/><path class='cls-1' d='M160.3,123.8a65.5,65.5,0,0,1-36.5,36.5'/><path class='cls-1' d='M123.8,39.7a65.5,65.5,0,0,1,36.5,36.5'/><line class='cls-2' x1='100' y1='160.3' x2='100' y2='192'/><line class='cls-2' x1='100' y1='69.4' x2='100' y2='130.6'/><line class='cls-2' x1='100' y1='8' x2='100' y2='39.7'/><line class='cls-2' x1='160.3' y1='100' x2='192' y2='100'/><line class='cls-2' x1='69.4' y1='100' x2='130.6' y2='100'/><line class='cls-2' x1='8' y1='100' x2='39.7' y2='100'/></svg>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "ScoreIcon",
});
</script>


<style lang="scss">

.score-icon-svg{

    & .cls-1,.cls-2{fill:none;stroke-linecap:round;stroke-linejoin:round;}

    & *{
        stroke-width:12px;
        stroke:#FFF;
        transition:var(--trans2) cubic-bezier(0,1,0,1);
    }
    
}

.misclick svg .cls-2{
    stroke: red;
}

</style>