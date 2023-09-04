


<template>

<br>
<p>Music</p>
<audio 
    ref="musicAudioElem"
    @ended="nextTrack"
    :src="musicAudioSrc">
</audio>
<br>
<button 
    :disabled="!musicInitiated" 
    @click="stopMusic">
    <span v-if="!musicPaused">&nbsp;||&nbsp;</span>
    <span v-else>&nbsp;|>&nbsp;</span>
</button>
<p v-if="musicInitiated">Now playing: {{ musicTitle }}</p>
<br>

<teleport to=".fs-music" v-if="!firstGame">
    <br>
    <p>Music</p>
    <audio 
        ref="musicAudioElem"
        @ended="nextTrack"
        :src="musicAudioSrc">
    </audio>
    <br>
    <button 
        :disabled="!musicInitiated" 
        @click="stopMusic">
        <span v-if="!musicPaused">&nbsp;||&nbsp;</span>
        <span v-else>&nbsp;|>&nbsp;</span>
    </button>
    <p v-if="musicInitiated">Now playing: {{ musicTitle }}</p>
    <br>
</teleport>

</template>



<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "AudioMusic",

    props:[
        "firstGame"
    ],

    data(){
        return{
            // Audio Elements
            playlist: [
                {title: "Oracle",
                song: require('@/assets/music/02-4mhz-oracle-110554.mp3')},

                {title: "Action Electronic Beats",
                song: require('@/assets/music/action-electronic-beats-148541.mp3')},

                {title: "Quantum",
                song: require('@/assets/music/black-scorpion-music-quantum-124117.mp3')},

                {title: "Dark Engine",
                song: require('@/assets/music/dark-cinermatic-electro-trailer-dark-engine-141041.mp3')},

                {title: "Drive",
                song: require('@/assets/music/drive-5957.mp3')},

                {title: "Insurrection",
                song: require('@/assets/music/insurrection-10941.mp3')},

                {title: "Rock the Party",
                song: require('@/assets/music/rock-the-party-110947.mp3')},

                {title: "Subway",
                song: require('@/assets/music/subway-15016.mp3')}
            ],

            currTrack: 0,
            musicTitle: "",
            musicAudioSrc: "",

            musicInitiated: false,
            musicPaused: false
        }
    },

    mounted(){
        this.musicAudioSrc = this.playlist[this.currTrack].song;
    },

    methods:{

        playMusicAudio(){
            this.musicInitiated = true;
            (this.$refs.musicAudioElem as HTMLAudioElement).play();
            this.musicTitle = this.playlist[this.currTrack].title;
        },

        nextTrack(){
            // Next Track
            this.currTrack++;
            
            if (this.currTrack >= this.playlist.length){
                this.currTrack = 0;
            }

            // Change the song title
            this.musicTitle = this.playlist[this.currTrack].title;

            // Change source to the next track
            this.musicAudioSrc = this.playlist[this.currTrack].song;

            // Make sure the song is loaded, if so - play
            (this.$refs.musicAudioElem as HTMLAudioElement).addEventListener("canplay", () => {
                this.playMusicAudio();
            });
            
        },

        stopMusic(){
            this.musicPaused = !this.musicPaused;

            if (this.musicPaused){
                (this.$refs.musicAudioElem as HTMLAudioElement).pause();
            } else {
                this.playMusicAudio();
            }
        }

    }

});
</script>



<style lang="scss">



</style>