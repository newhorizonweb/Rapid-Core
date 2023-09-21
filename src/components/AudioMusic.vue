


<template>
<div class="audio-player music-settings" :class="{'muted-audio': isMusicMuted}">

    <audio 
        ref="musicAudioElem"
        @ended="nextTrack"
        :src="musicAudioSrc">
    </audio>

    <div class="music-display glass-border">
        <div class="md-inner"
        ref="musicDisplay">

            <p class="music-title"
                ref="musicTitle">
                {{ musicTitle }}
            </p>
            <p class="music-title marquee-title">
                {{ musicTitle }}
            </p>
            <p class="music-title marquee-title">
                {{ musicTitle }}
            </p>

        </div>
    </div>
    
    <div class="volume-section vs-placeholder"></div>

    <div class="audio-panel">

        <div class="audio-buttons">
            <button class="audio-icon audio-arrow prev-track"
                @click="prevTrack"
                aria-label="Previous Track">
                <AudioArrow />
            </button>

            <button class="audio-icon"
                @click="stopMusic"
                aria-label="Pause Music">
                <PlayIcon v-if="pausedBtn" />
                <PauseIcon v-if="!pausedBtn" />
            </button>

            <button class="audio-icon audio-arrow next-track"
                @click="nextTrack"
                aria-label="Next Track">
                <AudioArrow />
            </button>
        </div>

        <input type="range" class="volume-slider"
            min="0" max="1" step="0.05" 
            v-model="musicVolume"
            @input="adjustMusicVolume"
            aria-label="Music Volume Slider">
    </div>

    <div class="volume-section">
        <button class="audio-icon mute-btn mute-music"
            @click="isMusicMuted = !isMusicMuted"
            aria-label="Mute Music">
            <MuteIcon />
        </button>
        <p>{{ (musicVolume * 100).toFixed(0) }}%</p>
    </div>

</div>

</template>



<script lang="ts">
import { defineComponent } from 'vue';
import AudioArrow from "./pageElements/AudioArrow.vue";
import PlayIcon from "./pageElements/PlayIcon.vue";
import PauseIcon from "./pageElements/PauseIcon.vue";
import MuteIcon from "./pageElements/MuteIcon.vue";

export default defineComponent({
    name: "AudioMusic",

    components:{
        AudioArrow,
        PlayIcon,
        PauseIcon,
        MuteIcon
    },

    props:[
        "firstGame"
    ],

    data(){
        return{
            // Tracks
            playlist: [
                {title: "Powerfull Electro Rock - AlexiAction",
                song: require('@/assets/music/powerfull-electro-rock-129466.mp3')},

                {title: "Fire Cyberpunk - AlexiAction",
                song: require('@/assets/music/fire-cyberpunk-sport-music-111884.mp3')},

                {title: "Electro Rock - LiteSaturation",
                song: require('@/assets/music/electro-sports-rock-120-bpm-full-12148.mp3')},

                {title: "Rock Fitness - LiteSaturation",
                song: require('@/assets/music/rock-fitness-sports-electro-112159.mp3')},

                {title: "Rock It - Coma-Media",
                song: require('@/assets/music/rock-it-21275.mp3')},

                {title: "Upbeat Sport - Diamond_Tunes",
                song: require('@/assets/music/upbeat-sport-20666.mp3')},

                {title: "Shadows - AlexiAction",
                song: require('@/assets/music/shadows-146931.mp3')},

                {title: "Booty Drop - Freccero",
                song: require('@/assets/music/freccero-booty-drop-115630.mp3')},

                {title: "Decisive Stage - SPmusic",
                song: require('@/assets/music/decisive-stage-154403.mp3')},

                {title: "Synthwave 80s - AlexiAction",
                song: require('@/assets/music/synthwave-80s-110045.mp3')},

                {title: "Midnight - AlexiAction",
                song: require('@/assets/music/midnight-138704.mp3')},

                {title: "Cyber Reality - Alex_Kizenkov",
                song: require('@/assets/music/electro-cuberpunk-cyber-reality-141371.mp3')},

                {title: "Data Breach - FASSounds",
                song: require('@/assets/music/data-breach-112775.mp3')},

                {title: "Opening - LiteSaturation",
                song: require('@/assets/music/opening-sports-100-bpm-full-12673.mp3')}
            ],

            currTrack: (localStorage.getItem("currTrack") !== null) ? Number(localStorage.getItem("currTrack")) : 0,
            musicTitle: "No Track",
            musicAudioSrc: "",

            // Audio state
            musicAudioElem: null as HTMLAudioElement | null,
            musicInitiated: false,

            // Pause
            musicPaused: false,
            pausedBtn: true, // true = play icon (unpaused), false = pause icon

            // Volume, Muted
            musicVolume: (localStorage.getItem("musicVolume") !== null) ? Number(localStorage.getItem("musicVolume")) : 0.5,
            isMusicMuted: (localStorage.getItem("isMusicMuted") === 'true') ? true : (localStorage.getItem("isMusicMuted") === 'false' ? false : false)
        }
    },

    mounted(){
        this.musicAudioElem = this.$refs.musicAudioElem as HTMLAudioElement;
        this.musicAudioSrc = this.playlist[this.currTrack].song;
        this.adjustMusicVolume();

        // Marquee
        this.marqueeTxt();
        window.addEventListener("resize", this.marqueeTxt);
    },

    methods:{

            /* Play / Initiate Music */

        playMusicInit(){
            if (!this.musicInitiated){
                this.pausedBtn = false;
            }
            this.musicInitiated = true;
            this.musicTitle = this.playlist[this.currTrack].title;

            if(!this.musicPaused && this.musicAudioElem){
                this.musicAudioElem.play();

                // Marquee
                this.$nextTick(() => {
                    this.marqueeTxt();
                });
            }
        },

        playMusicAudio(){
            this.musicInitiated = true;
            this.musicPaused = false;
            this.pausedBtn = false;
            this.musicTitle = this.playlist[this.currTrack].title;

            if(!this.musicPaused && this.musicAudioElem){
                this.musicAudioElem.play();

                // Marquee
                this.$nextTick(() => {
                    this.marqueeTxt();
                });
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

                // Marquee
                this.$nextTick(() => {
                    this.marqueeTxt();
                });
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

            // Marquee
            this.$nextTick(() => {
                this.marqueeTxt();
            });
        },

        nextTrack(){
            // Next Track
            this.currTrack++;
            if (this.currTrack == this.playlist.length){
                this.currTrack = 0;
            }

            // Change track
            this.changeTrack(this.currTrack);

            // Marquee
            this.$nextTick(() => {
                this.marqueeTxt();
            });
        },

            /* Pause */

        stopMusic(){
            if (this.musicInitiated){
                this.musicPaused = !this.musicPaused;
            }
            
            if (this.musicPaused){
                this.musicAudioElem!.pause();
                this.pausedBtn = true;
            } else {
                this.playMusicAudio();
            }
        },

            /* Volume, Mute */

        adjustMusicVolume(){
            if (this.musicAudioElem){
                this.musicAudioElem.volume = this.isMusicMuted ? 0 : this.musicVolume;
            }
            
            // Save the musicVolume and isMuted to the localStorage
            localStorage.setItem("musicVolume", this.musicVolume.toString());
            localStorage.setItem("isMusicMuted", this.isMusicMuted.toString());

            // Set the musicVolume to a CSS variable
            document.documentElement.style.setProperty('--musicVol', 
                (Math.round(this.musicVolume * 100)).toString()+"%");

            // Change the mute icon state
            this.muteIconState();
        },

        muteIconState(){
            const muteBtns = document.querySelectorAll(".mute-music");

            muteBtns.forEach((muteBtn) => {
                if (this.isMusicMuted){
                    muteBtn.classList.add("muted-icon-active")
                } else {
                    muteBtn.classList.remove("muted-icon-active")
                }
                
                if (muteBtn){
                    muteBtn!.classList.remove("mute-lvl1");
                    muteBtn!.classList.remove("mute-lvl2");

                    switch (true){
                        case this.musicVolume <= 0.3:
                            muteBtn!.classList.add("mute-lvl2");
                            break;
                        case this.musicVolume <= 0.6:
                            muteBtn!.classList.add("mute-lvl1");
                            break;
                    }
                }
            });
        },

            /* Marquee */

        marqueeTxt(){
            // Call this function in the $nextTick, so the musicTitle has correct width
            const musicDisplay = this.$refs.musicDisplay as HTMLElement;
            const musicTitle = this.$refs.musicTitle as HTMLElement;

            if (musicTitle.offsetWidth > musicDisplay.offsetWidth){
                musicDisplay.classList.add("marquee-active");
            } else {
                musicDisplay.classList.remove("marquee-active");
            }
        }

    },

    watch:{

        isMusicMuted:{
            immediate: true,
            handler(){
                this.adjustMusicVolume();
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

    /* Music Display */

.music-display{
    width:100%;
    height:60px;
    padding:var(--size2);
    position:relative;

    background:var(--colorGrad1);
    border-radius:var(--size2) !important;

    &:before{
        border-radius:calc(var(--border) + var(--size2));
        background:linear-gradient(to bottom right,
            var(--mainBorder1a), var(--mainBorder1b));
    }

    &:after{
        content:"";
        width:100%;
        height:100%;

        position:absolute;
        top:0;
        left:0;

        opacity:0.1;
        background-color:var(--mainColor);
        border-radius:calc(var(--border) + var(--size4));
        pointer-events:none;
    }

}

.md-inner{
    width:100%;
    max-width:100%;
    height:100%;
    position:relative;

    display:flex;
    justify-content:center;
    align-items:center;
    gap:50px;

    white-space:nowrap;
    overflow:hidden;
    z-index:10;

    & .music-title{
        will-change:transform;

        flex-shrink:0;
        min-width:100%;
        margin-bottom:-4px;
        transform:translateX(0);

        text-align:center;
        font-size:22px;
    }

    & .marquee-title{
        display:none;
    }

    &.marquee-active .music-title{
        display:flex;
        animation:marqueeAnim 6s linear infinite;
    }

}

@keyframes marqueeAnim{
    0%{
        transform:translate3d(30%, 0, 0);
    }
    100%{
        transform:translate3d(calc(-70% - 50px), 0, 0);
    }
}

</style>