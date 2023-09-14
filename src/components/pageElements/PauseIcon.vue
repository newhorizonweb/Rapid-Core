


<template>
<div class="pause-icon-svg">
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect class="cls-1" x="29.6" y="8.1" width="24.6" height="183.86" rx="12"/><rect class="cls-1" x="145.8" y="8.1" width="24.6" height="183.86" rx="12"/></svg>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "PauseIcon",
});
</script>


<style lang="scss">

.pause-icon-svg{

    & .cls-1{stroke-linecap:round;stroke-linejoin:round;}

    & *{
        fill:rgb(0,0,0,0);
        stroke:#FFF;
        stroke-width:16px;
    }
    
}

</style>