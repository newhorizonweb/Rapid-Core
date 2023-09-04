


<template>

<audio class="gameplay-audio" ref="startAudioElem" :src="startAudioSrc"></audio>
<audio class="gameplay-audio" ref="preTimeAudioElem" :src="preTimeAudioSrc"></audio>
<audio class="gameplay-audio" ref="finishAudioElem" :src="finishAudioSrc"></audio>

</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "AudioGame",

    emits: [
        "audioGameElements"
    ],

    data(){
        return{
            // Audio Elements
            startAudioSrc: require('@/assets/audio/start.mp3'),
            preTimeAudioSrc: require('@/assets/audio/pre-time.mp3'),
            clickAudioSrc: require('@/assets/audio/click.flac'),
            finishAudioSrc: require('@/assets/audio/finish.mp3'),
            clickAudioPool: [] as HTMLAudioElement[],
            clickAudioMax: 10,

            // Audio Settings
            masterVolume: 1,
            isMuted: false,
        }
    },

    mounted(){

        // Create "core click" audio elements
        for (let i = 0; i < this.clickAudioMax; i++){
            const audio = new Audio(this.clickAudioSrc);
            this.clickAudioPool.push(audio);
        }

        // Send the audio elements to the GameField
        this.$emit("audioGameElements", {
            start: this.$refs.startAudioElem,
            preTime: this.$refs.preTimeAudioElem,
            finish: this.$refs.finishAudioElem,
        });

    },

    methods:{

        playClickSound(){
            // Find an audio instance that's not playing
            const audio = this.clickAudioPool.find(a => a.paused || a.ended);

            // Get the volume level and "muted" state
            this.masterVolume = (localStorage.getItem("masterVolume") !== null) ? Number(localStorage.getItem("masterVolume")) : 1;
            this.isMuted = (localStorage.getItem("isMuted") === 'true') ? true : (localStorage.getItem("isMuted") === 'false' ? false : false);
    
            // Apply the volume / muted state & play the sound
            if (audio){
                audio.volume = this.isMuted ? 0 : this.masterVolume;
                audio.currentTime = 0;
                audio.play();
            }
        }

    }

});
</script>



<style lang="scss">



</style>