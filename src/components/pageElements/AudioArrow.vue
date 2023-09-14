


<template>
<div class="audio-arrow-svg">
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path class="cls-1" d="M170.1,189.9l-85-85a6.9,6.9,0,0,1,0-9.8l85-85a7,7,0,0,1,11.9,5V184.9A7,7,0,0,1,170.1,189.9Z"/><rect class="cls-1" x="18" y="8.1" width="24.6" height="183.86" rx="12"/></svg>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "AudioArrow",
});
</script>


<style lang="scss">

.audio-arrow-svg{

    & .cls-1{stroke-linecap:round;stroke-linejoin:round;}

    & *{
        fill:rgb(0,0,0,0);
        stroke:#FFF;
        stroke-width:16px;
    }

    &:hover path{
        transform:translate(-20%, 0);
    }


}

</style>