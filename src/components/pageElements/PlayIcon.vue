


<template>
<div class="play-icon-svg">
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154.6 199.9"><path class="cls-1" d="M47.4,189.9l119-85c3.9-2.7,3.9-7.1,0-9.8l-119-85c-6.2-4.4-16.7-1.3-16.7,5V184.9C30.7,191.2,41.2,194.3,47.4,189.9Z" transform="translate(-22.7 -0.1)"/></svg>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "PlayIcon",
});
</script>


<style lang="scss">

.play-icon-svg{

    & .cls-1{stroke-linecap:round;stroke-linejoin:round;}

    & *{
        fill:rgb(0,0,0,0);
        stroke:#FFF;
        stroke-width:16px;
    }
    
}

</style>