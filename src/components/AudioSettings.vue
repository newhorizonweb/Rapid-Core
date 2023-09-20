


<template>

<div class="audio-player audio-settings" :class="{'muted-audio': isMuted}">
    <p class="audio-label">Gameplay Audio</p>

    <input type="range" class="volume-slider"
        min="0" max="1" step="0.05" 
        v-model="masterVolume"
        @input="adjustVolume"
        aria-label="Gameplay Volume Slider">

    <div class="volume-section">
        <button 
            class="audio-icon mute-btn mute-master"
            :class="{'muted-icon-active': isMuted}"
            @click="isMuted = !isMuted"
            aria-label="Mute Gameplay Sounds">
            <MuteIcon />
        </button>
        <p>{{ (masterVolume * 100).toFixed(0) }}%</p>
    </div>
</div>

</template>



<script lang="ts">
import { defineComponent } from 'vue';
import MuteIcon from "./pageElements/MuteIcon.vue";

export default defineComponent({
    name: "AudioSettings",

    components:{
        MuteIcon
    },

    props:[
        "firstGame"
    ],

    data(){
        return{
            // Audio Settings
            masterVolume: (localStorage.getItem("masterVolume") !== null) ? Number(localStorage.getItem("masterVolume")) : 1,
            isMuted: (localStorage.getItem("isMuted") === 'true') ? true : (localStorage.getItem("isMuted") === 'false' ? false : false),
        }
    },

    mounted(){
        this.adjustVolume();
    },

    methods:{

        adjustVolume(){
            // Set the volume and muted state
            const audioElems = document.querySelectorAll(".gameplay-audio");
            audioElems.forEach((audioElem) => {
                (audioElem as HTMLAudioElement).volume = this.isMuted ? 0 : this.masterVolume;
            });

            // Save the masterVolume and isMuted to the localStorage
            localStorage.setItem("masterVolume", this.masterVolume.toString());
            localStorage.setItem("isMuted", this.isMuted.toString());

            // Set the masterVolume to a CSS variable
            document.documentElement.style.setProperty('--masterVol', 
                (Math.round(this.masterVolume * 100)).toString()+"%");

            // Change the mute icon state
            this.muteIconState();
        },

        muteIconState(){
            const muteBtns = document.querySelectorAll(".mute-master");

            muteBtns.forEach((muteBtn) => {
                if (this.isMuted){
                    muteBtn.classList.add("muted-icon-active")
                } else {
                    muteBtn.classList.remove("muted-icon-active")
                }
                
                if (muteBtn){
                    muteBtn!.classList.remove("mute-lvl1");
                    muteBtn!.classList.remove("mute-lvl2");

                    switch (true){
                        case this.masterVolume <= 0.3:
                            muteBtn!.classList.add("mute-lvl2");
                            break;
                        case this.masterVolume <= 0.6:
                            muteBtn!.classList.add("mute-lvl1");
                            break;
                    }
                }
            });
        },

    },

    watch:{

        isMuted:{
            immediate: true,
            handler(){
                this.adjustVolume();
            }
        },
        
        firstGame:{
            immediate: true,
            handler(){
                this.$nextTick(() => {
                    this.muteIconState();
                });
            }
        },

    }

});
</script>



<style lang="scss">



</style>