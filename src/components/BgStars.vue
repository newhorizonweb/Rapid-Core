


<template>
    <div class="bg-stars" ref="bgStars"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type StarData = {
    element: HTMLDivElement;
    position: {
        x: number;
        y: number;
    };
};

export default defineComponent({
    name: "BgStars",

    data(){
        return{
            debouncedHandleResize: null as (() => void) | null,

            stars: [] as StarData[],
            starNumber: this.calcStarNumber(),
            starSizeMin: 1,
            starSizeMax: 2
        }
    },

    props:[
        "blobContainer"
    ],
    
    mounted(){
        this.createStar();
        this.debouncedHandleResize = this.debounce(this.handleResize, 150);
        window.addEventListener('resize', this.debouncedHandleResize);
    },

    beforeUnmount(){
        if (this.debouncedHandleResize) {
            window.removeEventListener('resize', this.debouncedHandleResize);
            this.debouncedHandleResize = null;
        }
    },

    methods:{
        
        debounce(func: (...args: any[]) => void, wait = 300): (...args: any[]) => void{
            let timeout: ReturnType<typeof setTimeout> | null;
            return function (this: unknown, ...args: any[]){
                if (timeout !== null){
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        },

        createStar(){

            const starContainer: HTMLElement = this.$refs.bgStars as HTMLElement;   

            for (let i = 0; i < this.starNumber; i++){

                // Create the star element
                const star = document.createElement("div");
                star.classList.add("bg-star");

                // Create the inner star element
                const innerStar = document.createElement("div");
                innerStar.classList.add("inner-bg-star");
                star.appendChild(innerStar);

                // Random Size
                const size = Math.random() * 
                    (this.starSizeMax - this.starSizeMin) + this.starSizeMin;
                star.style.width = size + "px";
                star.style.height = size + "px";

                // Random Position
                const posX = Math.random() * 
                    (starContainer.offsetWidth - size);
                const posY = Math.random() * 
                    (starContainer.offsetHeight - size);
                    
                const starData = {
                    element: star,
                    position:{ 
                        x: posX,
                        y: posY
                    }
                };

                // Append the star and set its position
                this.stars.push(starData);
                star.style.transform = `translate(${posX}px, ${posY}px)`;
                starContainer.appendChild(star);

            }

        },

        calcStarNumber(): number{
            const width = window.innerWidth;
            let newStarNumber = 10;

            switch (true){
                case width <= 540:
                    newStarNumber = 27;
                    break;

                case width <= 1024:
                    newStarNumber = 63;
                    break;

                case width <= 1440:
                    newStarNumber = 81;
                    break;

                default:
                    newStarNumber = 90;
            }

            return newStarNumber;
        },

        handleResize(){
            // New star number (based on the screen width)
            const newStarNumber = this.calcStarNumber();

            // Return if the star count is the same as before
            if (this.starNumber === newStarNumber) return;

            const starContainer: HTMLElement = this.$refs.bgStars as HTMLElement;

            if (newStarNumber > this.starNumber){

                // Remove Stars
                for (let i = 0; i < this.starNumber; i++){
                    const starData = this.stars.pop();
                    
                    if (starData){
                        starContainer.removeChild(starData.element);
                    }
                }
                
                // Create stars
                this.starNumber = newStarNumber;
                this.createStar();

            } else {

                // Remove the excess
                const difference = this.starNumber - newStarNumber;

                // Remove from DOM
                for (let i = 0; i < difference; i++){
                    const starData = this.stars.pop();
                    
                    if (starData){
                        starContainer.removeChild(starData.element);
                    }
                }

            }

            // Update the blob number
            this.starNumber = newStarNumber;
        }



    }

});
</script>



<style lang="scss">

.bg-stars{
    position:absolute;
    width:100%;
    height:100vh;

    & .bg-star{
        position:absolute;

        & .inner-bg-star{
            width:100%;
            height:100%;
            position:absolute;

            border-radius:50%;
            background-color:#FFF;

            &:before, 
            &:after{
                content:"";
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%, -50%) scale(0);

                background-color:#FFF;
                border-radius:50%;
                filter:blur(2px);
            }

            &:before{
                height:100%;
            }

            &:after{
                width:100%;
            }
        
        }

        &:is(:nth-of-type(9n + 2), :nth-of-type(9n + 6)) .inner-bg-star{
            background-color:var(--mainColor);

            &:before,
            &:after{
                background-color:var(--mainColor);
            }
            
        }
        
        &:nth-of-type(3n + 1) .inner-bg-star{
            &:before{
                width:1500%;
            }
            &:after{
                height:1500%;
            }
        }
        &:nth-of-type(3n + 2) .inner-bg-star{
            &:before{
                width:2000%;
            }
            &:after{
                height:2000%;
            }
        }
        &:nth-of-type(3n + 3) .inner-bg-star{
            &:before{
                width:2500%;
            }
            &:after{
                height:2500%;
            }
        }

            /* Only some of the stars have the rays */

        &:nth-of-type(9n + 1) .inner-bg-star{
            transform:rotate(45deg);

            &:before{
                animation:starGrow 2.5s ease-in-out forwards,
                    starShine1 10s ease-in-out infinite 2.5s;
            }
            &:after{
                animation:starGrow 2.6s ease-in-out forwards,
                    starShine1 10s ease-in-out infinite 2.6s;
            }
        }
        &:nth-of-type(9n + 2) .inner-bg-star{
            &:before{
                background-color:var(--mainColor);
                animation:starGrow 3s ease-in-out 4s forwards,
                    starShine2 13s ease-in-out infinite 9s;
            }
            &:after{
                background-color:var(--mainColor);
                animation:starGrow 3.1s ease-in-out 4s forwards,
                    starShine2 13s ease-in-out infinite 9.15s;
            }
        }
        &:nth-of-type(9n + 3) .inner-bg-star{
            &:before{
                animation:starGrow 4s ease-in-out forwards,
                    starShine1 14s ease-in-out infinite 4s;
            }
            &:after{
                animation:starGrow 4.1s ease-in-out forwards,
                    starShine1 14s ease-in-out infinite 4.1s;
            }
        }
        &:nth-of-type(9n + 4) .inner-bg-star{
            &:before{
                animation:starGrow 5s ease-in-out 6s forwards,
                    starShine1 9s ease-in-out infinite 13s;
            }
            &:after{
                animation:starGrow 5.1s ease-in-out 6s forwards,
                    starShine1 9s ease-in-out infinite 13.15s;
            }
        }

    }

}

@keyframes starGrow{
    0%{
        transform:translate(-50%, -50%) scale(0);
    }
    100%{
        transform:translate(-50%, -50%) scale(1);
    }
}

@keyframes starShine1{
    0%{
        transform:translate(-50%, -50%) scale(1);
    }
    10%{
        transform:translate(-50%, -50%) scale(0);
    }
    50%{
        transform:translate(-50%, -50%) scale(0);
    }
    55%{
        transform:translate(-50%, -50%) scale(1.3);
    }
    65%{
        transform:translate(-50%, -50%) scale(1);
    }
    75%{
        transform:translate(-50%, -50%) scale(1);
    }
    80%{
        transform:translate(-50%, -50%) scale(1.3);
    }
    85%{
        transform:translate(-50%, -50%) scale(1);
    }
    100%{
        transform:translate(-50%, -50%) scale(1);
    }
}

@keyframes starShine2{
    0%{
        transform:translate(-50%, -50%) scale(1);
    }
    10%{
        transform:translate(-50%, -50%) scale(0);
    }
    50%{
        transform:translate(-50%, -50%) scale(0);
    }
    55%{
        transform:translate(-50%, -50%) scale(1.15);
    }
    65%{
        transform:translate(-50%, -50%) scale(1);
    }
    75%{
        transform:translate(-50%, -50%) scale(1);
    }
    80%{
        transform:translate(-50%, -50%) scale(1.15);
    }
    85%{
        transform:translate(-50%, -50%) scale(1);
    }
    100%{
        transform:translate(-50%, -50%) scale(1);
    }
}



</style>