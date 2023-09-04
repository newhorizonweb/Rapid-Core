


<template>

<div class="audio-settings" :class="{'muted-audio': isMuted}">
    <input type="range" 
        min="0" max="1" step="0.05" 
        v-model="masterVolume"
        @input="adjustVolume"
    >
    <button @click="isMuted = !isMuted; adjustVolume">X</button>
    <p>Volume: {{ (masterVolume * 100).toFixed(0) }}%</p>
</div>

<!-- Teleporting it is the easiest way -->
<!-- Otherwise, it would be difficult to synch the inputs -->
<teleport to=".fs-audio" v-if="!firstGame">
    <div class="audio-settings" :class="{'muted-audio': isMuted}">
        <input type="range" 
            min="0" max="1" step="0.05" 
            v-model="masterVolume"
            @input="adjustVolume"
        >
        <button @click="isMuted = !isMuted">X</button>
        <p>Volume: {{ (masterVolume * 100).toFixed(0) }}%</p>
    </div>
</teleport>


</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "AudioSettings",

    props:[
        "firstGame"
    ],

    data(){
        return{
            // Audio Elements
            startAudioElem: null as HTMLAudioElement | null,
            preTimeAudioElem: null as HTMLAudioElement | null,
            finishAudioElem: null as HTMLAudioElement | null,

            // Audio Settings
            masterVolume: (localStorage.getItem("masterVolume") !== null) ? Number(localStorage.getItem("masterVolume")) : 1,
            isMuted: (localStorage.getItem("isMuted") === 'true') ? true : (localStorage.getItem("isMuted") === 'false' ? false : false),
        }
    },

    mounted(){

        // Adjust the volume on load
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
        }

    },

    watch:{

        isMuted:{
            immediate: true,
            handler(){
                this.adjustVolume();
            }
        }

    }

});
</script>



<style lang="scss">



</style>