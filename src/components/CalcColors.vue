


<template>

    <p class="main-color-calculated">{{ mainColor }}</p>

</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "CalcColors",

    data(){
        return{
            mainColor: ""
        }
    },

    mounted(){
       this.setVariables();
    },

    methods:{

        hexToRgb(hex: string){

            // Remove the "#"
            hex = hex.charAt(0) === "#" ? hex.slice(1) : hex;

            let bigint = parseInt(hex, 16);
            let r = (bigint >> 16) & 255;
            let g = (bigint >> 8) & 255;
            let b = bigint & 255;

            return [r, g, b];
        },

        getCssVariable(varName: string){
            const compStyle = getComputedStyle(document.body);
            let colorVal = compStyle.getPropertyValue(varName).trim();

            // If it's a HEX value
            if (colorVal.startsWith("#")){
                let [r, g, b] = this.hexToRgb(colorVal);
                colorVal = `rgb(${r}, ${g}, ${b})`;
            }

            return colorVal;
        },

        calcVar(varName: string, operation: string, newVal: number, transpar: number){

            this.mainColor = this.getCssVariable(varName);
            const newColor: RegExpMatchArray | null = this.mainColor.match(/\d+/g);

            if (newColor){
                const newTranspar = transpar * 0.01;

                let r = parseInt(newColor[0]),
                    g = parseInt(newColor[1]),
                    b = parseInt(newColor[2]);

                switch (operation){
                    case "add":
                        r += newVal;
                        g += newVal;
                        b += newVal;
                        break;

                    case "sub":
                        r -= newVal;
                        g -= newVal;
                        b -= newVal;
                        break;
                }

                const   newR = Math.max(0, Math.min(255, r)),
                        newG = Math.max(0, Math.min(255, g)),
                        newB = Math.max(0, Math.min(255, b));

                return `rgb(${newR}, ${newG}, ${newB}, ${newTranspar})`;
            } else {
                return this.mainColor;
            }

        },

        setVariables(){
            const bodyStyle = document.body.style;

            // 1. Source variable name
            // 2. Operation - "add" or "sub" (subtract)
            // 3. Add / sub value - number 0-255
            // 4. Transparency (percent) - (0: full tran., 100: no tran.)

            // Main Color Shades
            bodyStyle.setProperty('--mainShade1', 
                this.calcVar("--mainColor", "sub", 40, 100));

            bodyStyle.setProperty('--mainShade2',
                this.calcVar("--mainColor", "sub", 60, 100));

            // Main Color Semi-Transparent
            bodyStyle.setProperty('--mainColor1t10', 
                this.calcVar("--mainColor", "add", 0, 10));
        }

    }

});
</script>



<style lang="scss">

.main-color-calculated{
    display:none;
}

</style>