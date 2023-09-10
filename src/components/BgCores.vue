


<template>

<div class="bg-blobs" ref="bgBlobs">
    <BgStars 
        :blobContainer="this.$refs.bgBlobs"
    />
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BgStars from "./BgStars.vue"

type BlobData = {
    element: HTMLDivElement;
    position: {
        x: number;
        y: number;
    };
    speed: {
        x: number;
        y: number;
    };
};

export default defineComponent({
    name: "BgBlobs",

    components: {
        BgStars
    },

    data(){
        return{
            blobs: [] as BlobData[],
            blobNumber: this.calculateBlobNumber(),
            blobSizeMin: 30,
            blobSizeMax: 150
        }
    },

    mounted(){
        this.createBlob();
        this.animateBlobs();
        window.addEventListener('resize', this.handleResize);
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },

    methods:{

        createBlob(){
            const blobContainer: HTMLElement = this.$refs.bgBlobs as HTMLElement;

            for (let i = 0; i < this.blobNumber; i++){

                // Create the blob element
                const blob = document.createElement("div");
                blob.classList.add("bg-blob");

                // Random Size
                const size = Math.random() * 
                    (this.blobSizeMax - this.blobSizeMin) + this.blobSizeMin;
                blob.style.width = size + "px";
                blob.style.height = size + "px";

                // Random Position & Speed
                const posX = Math.random() * 
                    (blobContainer.offsetWidth - size);
                const posY = Math.random() * 
                    (blobContainer.offsetHeight - size);

                const blobData = {
                    element: blob,
                    position:{ 
                        x: posX,
                        y: posY
                    },
                    speed:{
                        x: (Math.random() - 1) / 3,
                        y: (Math.random() - 1) / 3
                    }
                };

                // Append the blob and set its position
                this.blobs.push(blobData);
                blob.style.transform = `translate(${posX}px, ${posY}px)`;
                blobContainer.appendChild(blob);

            }
        },

        animateBlobs(){
            const blobContainer: HTMLElement = this.$refs.bgBlobs as HTMLElement;

            const updateBlobs = () => {
                for (let blobData of this.blobs){

                    // Update position based on velocity
                    blobData.position.x += blobData.speed.x;
                    blobData.position.y += blobData.speed.y;

                    // Bounce the blob off the screen edge
                    if (blobData.position.x < 0 || 
                        blobData.position.x + blobData.element.offsetWidth > blobContainer.offsetWidth){
                        blobData.speed.x = -blobData.speed.x;
                    }

                    if (blobData.position.y < 0 ||
                        blobData.position.y + blobData.element.offsetHeight > blobContainer.offsetHeight){
                        blobData.speed.y = -blobData.speed.y;
                    }

                    // Set blob's new position
                    blobData.element.style.transform = 
                        `translate(${blobData.position.x}px, ${blobData.position.y}px)`;

                }

                // Request the next frame
                requestAnimationFrame(updateBlobs);
            };

            // Initialize the animation
            updateBlobs();
        },

        calculateBlobNumber(): number{
            const width = window.innerWidth;
            let newBlobNumber = 10;

            switch (true){
                case width <= 540:
                    newBlobNumber = 6;
                    break;

                case width <= 1024:
                    newBlobNumber = 7;
                    break;

                case width <= 1440:
                    newBlobNumber = 8;
                    break;

                default:
                    newBlobNumber = 10;
            }

            return newBlobNumber;
        },

        adjustBlobsPosition() {
            const blobContainer: HTMLElement = this.$refs.bgBlobs as HTMLElement;
            
            this.blobs.forEach(blobData => {
                // Check if the blob's x position goes out of the right boundary
                if (blobData.position.x + blobData.element.offsetWidth > blobContainer.offsetWidth) {
                    blobData.position.x = blobContainer.offsetWidth - blobData.element.offsetWidth;
                }

                // Check if the blob's y position goes out of the bottom boundary
                if (blobData.position.y + blobData.element.offsetHeight > blobContainer.offsetHeight) {
                    blobData.position.y = blobContainer.offsetHeight - blobData.element.offsetHeight;
                }

                // Update the blob's transform to reflect any position adjustments
                blobData.element.style.transform = 
                    `translate(${blobData.position.x}px, ${blobData.position.y}px)`;
            });
        },

        handleResize(){
            // Change the blob position (if they go out of the view)
            this.adjustBlobsPosition();

            // New blob number (based on the screen width)
            const newBlobNumber = this.calculateBlobNumber();

            // Return if the blob count is the same as before
            if (this.blobNumber === newBlobNumber) return;

            const blobContainer: HTMLElement = this.$refs.bgBlobs as HTMLElement;

            if (newBlobNumber > this.blobNumber){
                // Create the needed difference in blob count
                this.blobNumber = newBlobNumber - this.blobNumber;
                this.createBlob();
            } else {
                // Remove the excess
                const difference = this.blobNumber - newBlobNumber;

                // Remove from DOM
                for (let i = 0; i < difference; i++){
                    const blobData = this.blobs.pop();
                    
                    if (blobData){
                        blobContainer.removeChild(blobData.element);
                    }
                }
            }

            // Update the blob number
            this.blobNumber = newBlobNumber;
        }

    }
    
});
</script>



<style lang="scss">
.bg-blobs{
    width:100vw;
    height:100vh;

    position:fixed;
    top:0;
    left:0;
    overflow:hidden;

    .bg-blob{
        position:absolute;
        z-index:10;

        &:after{
            content:"";
            width:100%;
            height:105%;
            position:absolute;

            background:linear-gradient(to right,
                var(--mainColor), var(--accColor));
            border-radius:50%;
            filter:blur(32px);
            transition:var(--trans3);
        }

        &:nth-of-type(3n + 1):after{
            animation:blobGrow 2.5s ease-in-out, 
                blobBreathe 10s ease-in-out infinite 2.5s;
        }
        &:nth-of-type(3n + 2):after{
            animation:blobGrow 4s ease-in-out, 
                blobBreathe 8s ease-in-out infinite 4s;
        }
        &:nth-of-type(3n + 3):after{
            animation:blobGrow 7s ease-in-out, 
                blobBreathe 13s ease-in-out infinite 7s;
        }

    }

}

@keyframes blobGrow{
    0%{
        transform:scale(0);
    }
    100%{
        transform:scale(1);
    }
}

@keyframes blobBreathe{
    0%{
        transform:scale(1) rotate(0deg);
    }
    25%{
        transform:scale(0.8) rotate(90deg);
    }
    50%{
        transform:scale(1) rotate(180deg);
    }
    75%{
        transform:scale(0.8) rotate(270deg);
    }
    100%{
        transform:scale(1) rotate(360deg);
    }
}

</style>