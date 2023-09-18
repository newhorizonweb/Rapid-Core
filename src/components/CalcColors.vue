


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
                const newTranspar = Math.round(transpar) / 100;

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



            // Main Color Background
            bodyStyle.setProperty('--mainBg1a', 
                this.calcVar("--mainColor", "sub", 90, 35));

            bodyStyle.setProperty('--mainBg1b', 
                this.calcVar("--mainColor", "sub", 70, 20));

            bodyStyle.setProperty('--mainBg1c', 
                this.calcVar("--mainColor", "sub", 70, 100));


            bodyStyle.setProperty('--mainBg2a',
                this.calcVar("--mainColor", "sub", 70, 70));

            bodyStyle.setProperty('--mainBg2b',
                this.calcVar("--mainColor", "sub", 20, 60));


            bodyStyle.setProperty('--mainBg3a',
                this.calcVar("--mainColor", "sub", 160, 70));

            bodyStyle.setProperty('--mainBg3b',
                this.calcVar("--mainColor", "sub", 140, 60));



            // Accent Color Background
            bodyStyle.setProperty('--accBg2a',
                this.calcVar("--accColor", "sub", 70, 70));

            bodyStyle.setProperty('--accBg2b',
                this.calcVar("--accColor", "sub", 20, 60));



            // Main Color Shades
            bodyStyle.setProperty('--mainShade1', 
                this.calcVar("--mainColor", "sub", 40, 100));

            bodyStyle.setProperty('--mainShade2',
                this.calcVar("--mainColor", "sub", 60, 100));



            // Main Color Tint
            bodyStyle.setProperty('--mainTint1', 
                this.calcVar("--mainColor", "add", 40, 100));



            // Main Color Borders
            bodyStyle.setProperty('--mainBorder1a', 
                this.calcVar("--mainColor", "add", 15, 15));
                
            bodyStyle.setProperty('--mainBorder1b', 
                this.calcVar("--mainColor", "add", 30, 20));


            bodyStyle.setProperty('--mainBorder2a', 
                this.calcVar("--mainColor", "add", 50, 20));
                
            bodyStyle.setProperty('--mainBorder2b', 
                this.calcVar("--mainColor", "add", 75, 35));
                


            // Accent Color Borders
            bodyStyle.setProperty('--accBorder2a', 
                this.calcVar("--accColor", "add", 50, 30));
                
            bodyStyle.setProperty('--accBorder2b', 
                this.calcVar("--accColor", "add", 75, 45));



            // Main Color Scrollbar
            bodyStyle.setProperty('--mainScrollBg',
                this.calcVar("--mainColor", "sub", 185, 85));

            bodyStyle.setProperty('--mainScrollHover',
                this.calcVar("--mainColor", "add", 25, 100));
        }

    }

});
</script>



<style lang="scss">

.main-color-calculated{
    display:none;
}

</style>