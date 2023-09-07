


<template>

    <p class="main-color-calculated">{{ mainColor }}</p>

</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "CalcColors",

    emits: [

    ],

    data(){
        return{
            mainColor: ""
        }
    },

    created(){
       this.setVariables();
    },

    methods:{

        getCssVariable(varName: string){
            const compStyle = getComputedStyle(document.body);
            return compStyle.getPropertyValue(varName).trim();
        },

        calcVar(newVal: number){
            this.mainColor = this.getCssVariable("--mainColor");
            const newColor: RegExpMatchArray | null = this.mainColor.match(/\d+/g);

            if (newColor){
                const r = parseInt(newColor[0]) - newVal;
                const g = parseInt(newColor[1]) - newVal;
                const b = parseInt(newColor[2]) - newVal;

                const newR = Math.max(0, Math.min(255, r));
                const newG = Math.max(0, Math.min(255, g));
                const newB = Math.max(0, Math.min(255, b));

                return `rgb(${newR}, ${newG}, ${newB})`;
            } else {
                return this.mainColor;
            }

        },

        setVariables(){
            const bodyStyle = document.body.style;

            bodyStyle.setProperty('--mainShadow1', this.calcVar(60));
            bodyStyle.setProperty('--mainShadow2', this.calcVar(70));
        }

    }

});
</script>



<style lang="scss">

.main-color-calculated{
    display:none;
}

</style>