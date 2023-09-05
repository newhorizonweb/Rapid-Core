


<template>
<div class="music-settings" :class="{'muted-audio': isMusicMuted}">
    <br>
    <br>
    <br>
    <br>  
    <p>Music</p>
    <audio 
        ref="musicAudioElem"
        @ended="nextTrack"
        :src="musicAudioSrc">
    </audio>
    <br>
    <p v-if="musicInitiated">Now playing: {{ musicTitle }}</p>
    <p>Volume: {{ (musicVolume * 100).toFixed(0) }}%</p>
    <br>

    <input type="range"
        min="0" max="1" step="0.05" 
        v-model="musicVolume"
        @input="adjustMusicVolume">

    <br>
    <button 
        @click="stopMusic">
        {{ pausedBtn }}
    </button>
    <button 
        class="mute-btn"
        @click="isMusicMuted = !isMusicMuted">
        X
    </button>

    <br>
    <button @click="prevTrack">prev</button>
    <button @click="nextTrack">next</button>
</div>



<teleport to=".fs-music" v-if="!firstGame">
    <div class="music-settings" :class="{'muted-audio': isMusicMuted}">
        <br>
        <br>
        <br>
        <br>  
        <p>Music</p>
        <audio 
            ref="musicAudioElem"
            @ended="nextTrack"
            :src="musicAudioSrc">
        </audio>
        <br>
        <p v-if="musicInitiated">Now playing: {{ musicTitle }}</p>
        <p>Volume: {{ (musicVolume * 100).toFixed(0) }}%</p>
        <br>

        <input type="range"
            min="0" max="1" step="0.05" 
            v-model="musicVolume"
            @input="adjustMusicVolume">

        <br>
        <button 
            @click="stopMusic">
            {{ pausedBtn }}
        </button>
        <button 
            class="mute-btn"
            @click="isMusicMuted = !isMusicMuted">
            X
        </button>

        <br>
        <button @click="prevTrack">prev</button>
        <button @click="nextTrack">next</button>
    </div>
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
            // Tracks
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
            currTrack: (localStorage.getItem("currTrack") !== null) ? Number(localStorage.getItem("currTrack")) : 0,
            musicTitle: "",
            musicAudioSrc: "",

            // Audio state
            musicAudioElem: null as HTMLAudioElement | null,
            musicInitiated: false,

            // Pause
            musicPaused: false,
            pausedBtn: "",
            pausedIcon: "||",
            unpausedIcon: "|>",

            // Volume, Muted
            musicVolume: (localStorage.getItem("musicVolume") !== null) ? Number(localStorage.getItem("musicVolume")) : 0.5,
            isMusicMuted: (localStorage.getItem("isMusicMuted") === 'true') ? true : (localStorage.getItem("isMusicMuted") === 'false' ? false : false)
        }
    },

    mounted(){
        this.musicAudioElem = this.$refs.musicAudioElem as HTMLAudioElement;
        this.musicAudioSrc = this.playlist[this.currTrack].song;

        this.pausedBtn = this.unpausedIcon;
        this.adjustMusicVolume();
    },

    methods:{

            /* Play / Initiate Music */

        playMusicInit(){
            if (!this.musicInitiated){
                this.pausedBtn = this.pausedIcon;
            }
            this.musicInitiated = true;
            this.musicTitle = this.playlist[this.currTrack].title;

            if(!this.musicPaused && this.musicAudioElem){
                this.musicAudioElem.play();
            }
        },

        playMusicAudio(){
            this.musicInitiated = true;
            this.musicPaused = false;
            this.pausedBtn = this.pausedIcon;
            this.musicTitle = this.playlist[this.currTrack].title;

            if(!this.musicPaused &&this.musicAudioElem){
                this.musicAudioElem.play();
            }
        },

            /* Track (Prev / Next) */

        changeTrack(trackIndex: number){
            // Change the song title
            this.musicTitle = this.playlist[trackIndex].title;

            // Change source to the next track
            this.musicAudioSrc = this.playlist[trackIndex].song;

            // Save current track index in the localStorage
            localStorage.setItem("currTrack", trackIndex.toString());

            // Make sure the song is loaded, if so - play
            this.musicAudioElem!.addEventListener("canplay", () => {
                this.playMusicAudio();
            });
        },

        prevTrack(){
            // Previous Track
            this.currTrack--;
            if (this.currTrack < 0){
                this.currTrack = this.playlist.length - 1;
            }

            // Change track
            this.changeTrack(this.currTrack);
        },

        nextTrack(){
            // Next Track
            this.currTrack++;
            if (this.currTrack == this.playlist.length){
                this.currTrack = 0;
            }

            // Change track
            this.changeTrack(this.currTrack);
        },

            /* Pause */

        stopMusic(){
            if (this.musicInitiated){
                this.musicPaused = !this.musicPaused;
            }
            
            if (this.musicPaused){
                this.musicAudioElem!.pause();
                this.pausedBtn = this.unpausedIcon;
            } else {
                this.playMusicAudio();
            }
        },

            /* Volume, Mute */

        adjustMusicVolume(){
            if (this.musicAudioElem){
                this.musicAudioElem.volume = this.isMusicMuted ? 0 : this.musicVolume;
            }
            
            // Save the masterVolume and isMuted to the localStorage
            localStorage.setItem("musicVolume", this.musicVolume.toString());
            localStorage.setItem("isMusicMuted", this.isMusicMuted.toString());
        }

    },

    watch:{

        isMusicMuted:{
            immediate: true,
            handler(){
                this.adjustMusicVolume();
            }
        }

    }

});
</script>



<style lang="scss">



</style>