


<template>
<div class="stats-icon-svg">
<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect class='cls-1 stats-icon-bar3' x='156' y='8' width='36' height='184' rx='18'/><rect class='cls-1 stats-icon-bar1' x='8' y='100' width='36' height='92' rx='18'/><rect class='cls-1 stats-icon-bar2' x='82' y='54' width='36' height='138' rx='18'/></svg>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "TimeIcon",
});
</script>


<style lang="scss">

.stats-btn{

    .cls-1{fill:none;stroke-miterlimit:10;stroke-width:16px;}

    & svg *{
        stroke-width:16px;
        stroke:#FFF;
        transform-origin:bottom;
        transition:var(--trans2);
    }

    &:hover{

        & .stats-icon-bar1{
            height:138px;
            y:54px;
        }
        
        & .stats-icon-bar2{
            height:184px;
            y:8px;
        }

        & .stats-icon-bar3{
            height:92px;
            y:100px;
        }

    }

    &.close-stats{

        & .stats-icon-bar1,
        & .stats-icon-bar3{
            height:240px;
            x:82px;
            y:-20px;
            
            transform-origin:center;
            transform:rotate(45deg);
            fill:var(--colorBg1c);
        }

        & .stats-icon-bar1{
            transition-delay:0.1s;
        }

        & .stats-icon-bar2{
            width:20px;
            height:184px;
            x:90px;
            y:8px;
            
            stroke-width:0;
            transform-origin:center;
            transform:rotate(-45deg);
            fill:var(--colorBg1c);
        }

        & .stats-icon-bar3{
            transform:rotate(-45deg);
        }

        &:hover{

            & .stats-icon-bar1,
            & .stats-icon-bar3{
                height:200px;
                y:0;
            }

        }

    }

}

</style>