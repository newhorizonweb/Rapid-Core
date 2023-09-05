(function(){"use strict";var e={4056:function(e,t,V){var s=V(9242),i=V(3396);const r={class:"page"},a=(0,i._)("br",null,null,-1);function o(e,t,V,s,o,u){const q=(0,i.up)("UserOptions"),l=(0,i.up)("AudioSettings"),n=(0,i.up)("AudioMusic"),c=(0,i.up)("GameField");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",r,[(0,i.Wm)(q,{onTimerIsSet:e.timerIsSetFun,firstGame:e.firstGame,resultsMounted:e.resultsMounted},null,8,["onTimerIsSet","firstGame","resultsMounted"]),(0,i.Wm)(l,{firstGame:e.firstGame},null,8,["firstGame"]),(0,i.Wm)(n,{ref:"AudioMusic",firstGame:e.firstGame},null,8,["firstGame"]),(0,i.Wm)(c,{onFirstGame:e.isFirstGame,onResultsMounted:e.resultsMountedFun,onStartGame:e.startGame,timeDuration:e.timeDuration},null,8,["onFirstGame","onResultsMounted","onStartGame","timeDuration"])]),a,(0,i.Uk)(" v0.6.0 ")],64)}const u=(0,i._)("h1",null,"Rapid Core",-1),q=(0,i._)("p",null,"Choose the time duration",-1),l=["disabled"],n=["disabled"],c=["disabled"];function m(e,t,V,s,r,a){return(0,i.wg)(),(0,i.iD)(i.HY,null,[u,q,(0,i._)("button",{class:"time-btn time-btn-current",onClick:t[0]||(t[0]=(...t)=>e.setTimeDur&&e.setTimeDur(...t)),disabled:!e.firstGame,runTime:"10"}," 10s ",8,l),(0,i._)("button",{class:"time-btn",onClick:t[1]||(t[1]=(...t)=>e.setTimeDur&&e.setTimeDur(...t)),disabled:!e.firstGame,runTime:"30"}," 30s ",8,n),(0,i._)("button",{class:"time-btn",onClick:t[2]||(t[2]=(...t)=>e.setTimeDur&&e.setTimeDur(...t)),disabled:!e.firstGame,runTime:"60"}," 60s ",8,c),e.resultsMounted?((0,i.wg)(),(0,i.j4)(i.lR,{key:0,to:".fs-time-btns"},[(0,i._)("button",{class:"time-btn time-btn-current",onClick:t[3]||(t[3]=(...t)=>e.setTimeDur&&e.setTimeDur(...t)),runTime:"10"}," 10s "),(0,i._)("button",{class:"time-btn",onClick:t[4]||(t[4]=(...t)=>e.setTimeDur&&e.setTimeDur(...t)),runTime:"30"}," 30s "),(0,i._)("button",{class:"time-btn",onClick:t[5]||(t[5]=(...t)=>e.setTimeDur&&e.setTimeDur(...t)),runTime:"60"}," 60s ")])):(0,i.kq)("",!0)],64)}var d=(0,i.aZ)({name:"UserOptions",emits:["timerIsSet"],props:["firstGame","resultsMounted"],data(){return{timeDuration:10}},methods:{setTimeDur(e){this.timeDuration=Number(e.target.getAttribute("runTime"));const t=document.querySelectorAll(".time-btn");t.forEach((function(e){e.classList.remove("time-btn-current")}));const V=document.querySelectorAll(`.time-btn[runTime="${this.timeDuration}"]`);V.forEach((function(e){e.classList.add("time-btn-current")})),this.$emit("timerIsSet",this.timeDuration)}}}),h=V(89);const A=(0,h.Z)(d,[["render",m]]);var p=A,g=V(7139);function S(e,t,V,r,a,o){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",{class:(0,g.C_)(["audio-settings",{"muted-audio":e.isMuted}])},[(0,i.wy)((0,i._)("input",{type:"range",min:"0",max:"1",step:"0.05","onUpdate:modelValue":t[0]||(t[0]=t=>e.masterVolume=t),onInput:t[1]||(t[1]=(...t)=>e.adjustVolume&&e.adjustVolume(...t))},null,544),[[s.nr,e.masterVolume]]),(0,i._)("button",{class:"mute-btn",onClick:t[2]||(t[2]=t=>e.isMuted=!e.isMuted)}," X "),(0,i._)("p",null,"Volume: "+(0,g.zw)((100*e.masterVolume).toFixed(0))+"%",1)],2),e.firstGame?(0,i.kq)("",!0):((0,i.wg)(),(0,i.j4)(i.lR,{key:0,to:".fs-audio"},[(0,i._)("div",{class:(0,g.C_)(["audio-settings",{"muted-audio":e.isMuted}])},[(0,i.wy)((0,i._)("input",{type:"range",min:"0",max:"1",step:"0.05","onUpdate:modelValue":t[3]||(t[3]=t=>e.masterVolume=t),onInput:t[4]||(t[4]=(...t)=>e.adjustVolume&&e.adjustVolume(...t))},null,544),[[s.nr,e.masterVolume]]),(0,i._)("button",{onClick:t[5]||(t[5]=t=>e.isMuted=!e.isMuted)},"X"),(0,i._)("p",null,"Volume: "+(0,g.zw)((100*e.masterVolume).toFixed(0))+"%",1)],2)]))],64)}var w=(0,i.aZ)({name:"AudioSettings",props:["firstGame"],data(){return{masterVolume:null!==localStorage.getItem("masterVolume")?Number(localStorage.getItem("masterVolume")):1,isMuted:"true"===localStorage.getItem("isMuted")||(localStorage.getItem("isMuted"),!1)}},mounted(){this.adjustVolume()},methods:{adjustVolume(){const e=document.querySelectorAll(".gameplay-audio");e.forEach((e=>{e.volume=this.isMuted?0:this.masterVolume})),localStorage.setItem("masterVolume",this.masterVolume.toString()),localStorage.setItem("isMuted",this.isMuted.toString())}},watch:{isMuted:{immediate:!0,handler(){this.adjustVolume()}}}});const f=(0,h.Z)(w,[["render",S]]);var k=f;const b=(0,i._)("br",null,null,-1),I=(0,i._)("br",null,null,-1),M=(0,i._)("br",null,null,-1),C=(0,i._)("br",null,null,-1),G=(0,i._)("p",null,"Music",-1),T=["src"],y=(0,i._)("br",null,null,-1),B={key:0},E=(0,i._)("br",null,null,-1),D=(0,i._)("br",null,null,-1),Y=(0,i._)("br",null,null,-1),F=(0,i._)("br",null,null,-1),x=(0,i._)("br",null,null,-1),v=(0,i._)("br",null,null,-1),Q=(0,i._)("br",null,null,-1),R=(0,i._)("p",null,"Music",-1),U=["src"],J=(0,i._)("br",null,null,-1),O={key:0},_=(0,i._)("br",null,null,-1),P=(0,i._)("br",null,null,-1),z=(0,i._)("br",null,null,-1);function K(e,t,V,r,a,o){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",{class:(0,g.C_)(["music-settings",{"muted-audio":e.isMusicMuted}])},[b,I,M,C,G,(0,i._)("audio",{ref:"musicAudioElem",onEnded:t[0]||(t[0]=(...t)=>e.nextTrack&&e.nextTrack(...t)),src:e.musicAudioSrc},null,40,T),y,e.musicInitiated?((0,i.wg)(),(0,i.iD)("p",B,"Now playing: "+(0,g.zw)(e.musicTitle),1)):(0,i.kq)("",!0),(0,i._)("p",null,"Volume: "+(0,g.zw)((100*e.musicVolume).toFixed(0))+"%",1),E,(0,i.wy)((0,i._)("input",{type:"range",min:"0",max:"1",step:"0.05","onUpdate:modelValue":t[1]||(t[1]=t=>e.musicVolume=t),onInput:t[2]||(t[2]=(...t)=>e.adjustMusicVolume&&e.adjustMusicVolume(...t))},null,544),[[s.nr,e.musicVolume]]),D,(0,i._)("button",{onClick:t[3]||(t[3]=(...t)=>e.stopMusic&&e.stopMusic(...t))},(0,g.zw)(e.pausedBtn),1),(0,i._)("button",{class:"mute-btn",onClick:t[4]||(t[4]=t=>e.isMusicMuted=!e.isMusicMuted)}," X "),Y,(0,i._)("button",{onClick:t[5]||(t[5]=(...t)=>e.prevTrack&&e.prevTrack(...t))},"prev"),(0,i._)("button",{onClick:t[6]||(t[6]=(...t)=>e.nextTrack&&e.nextTrack(...t))},"next")],2),e.firstGame?(0,i.kq)("",!0):((0,i.wg)(),(0,i.j4)(i.lR,{key:0,to:".fs-music"},[(0,i._)("div",{class:(0,g.C_)(["music-settings",{"muted-audio":e.isMusicMuted}])},[F,x,v,Q,R,(0,i._)("audio",{ref:"musicAudioElem",onEnded:t[7]||(t[7]=(...t)=>e.nextTrack&&e.nextTrack(...t)),src:e.musicAudioSrc},null,40,U),J,e.musicInitiated?((0,i.wg)(),(0,i.iD)("p",O,"Now playing: "+(0,g.zw)(e.musicTitle),1)):(0,i.kq)("",!0),(0,i._)("p",null,"Volume: "+(0,g.zw)((100*e.musicVolume).toFixed(0))+"%",1),_,(0,i.wy)((0,i._)("input",{type:"range",min:"0",max:"1",step:"0.05","onUpdate:modelValue":t[8]||(t[8]=t=>e.musicVolume=t),onInput:t[9]||(t[9]=(...t)=>e.adjustMusicVolume&&e.adjustMusicVolume(...t))},null,544),[[s.nr,e.musicVolume]]),P,(0,i._)("button",{onClick:t[10]||(t[10]=(...t)=>e.stopMusic&&e.stopMusic(...t))},(0,g.zw)(e.pausedBtn),1),(0,i._)("button",{class:"mute-btn",onClick:t[11]||(t[11]=t=>e.isMusicMuted=!e.isMusicMuted)}," X "),z,(0,i._)("button",{onClick:t[12]||(t[12]=(...t)=>e.prevTrack&&e.prevTrack(...t))},"prev"),(0,i._)("button",{onClick:t[13]||(t[13]=(...t)=>e.nextTrack&&e.nextTrack(...t))},"next")],2)]))],64)}var W=(0,i.aZ)({name:"AudioMusic",props:["firstGame"],data(){return{playlist:[{title:"Oracle",song:V(2906)},{title:"Action Electronic Beats",song:V(3743)},{title:"Quantum",song:V(4395)},{title:"Dark Engine",song:V(6040)},{title:"Drive",song:V(6250)},{title:"Insurrection",song:V(5106)},{title:"Rock the Party",song:V(8199)},{title:"Subway",song:V(7367)}],currTrack:null!==localStorage.getItem("currTrack")?Number(localStorage.getItem("currTrack")):0,musicTitle:"",musicAudioSrc:"",musicAudioElem:null,musicInitiated:!1,musicPaused:!1,pausedBtn:"",pausedIcon:"||",unpausedIcon:"|>",musicVolume:null!==localStorage.getItem("musicVolume")?Number(localStorage.getItem("musicVolume")):.5,isMusicMuted:"true"===localStorage.getItem("isMusicMuted")||(localStorage.getItem("isMusicMuted"),!1)}},mounted(){this.musicAudioElem=this.$refs.musicAudioElem,this.musicAudioSrc=this.playlist[this.currTrack].song,this.pausedBtn=this.unpausedIcon,this.adjustMusicVolume()},methods:{playMusicInit(){this.musicInitiated||(this.pausedBtn=this.pausedIcon),this.musicInitiated=!0,this.musicTitle=this.playlist[this.currTrack].title,!this.musicPaused&&this.musicAudioElem&&this.musicAudioElem.play()},playMusicAudio(){this.musicInitiated=!0,this.musicPaused=!1,this.pausedBtn=this.pausedIcon,this.musicTitle=this.playlist[this.currTrack].title,!this.musicPaused&&this.musicAudioElem&&this.musicAudioElem.play()},changeTrack(e){this.musicTitle=this.playlist[e].title,this.musicAudioSrc=this.playlist[e].song,localStorage.setItem("currTrack",e.toString()),this.musicAudioElem.addEventListener("canplay",(()=>{this.playMusicAudio()}))},prevTrack(){this.currTrack--,this.currTrack<0&&(this.currTrack=this.playlist.length-1),this.changeTrack(this.currTrack)},nextTrack(){this.currTrack++,this.currTrack==this.playlist.length&&(this.currTrack=0),this.changeTrack(this.currTrack)},stopMusic(){this.musicInitiated&&(this.musicPaused=!this.musicPaused),this.musicPaused?(this.musicAudioElem.pause(),this.pausedBtn=this.unpausedIcon):this.playMusicAudio()},adjustMusicVolume(){this.musicAudioElem&&(this.musicAudioElem.volume=this.isMusicMuted?0:this.musicVolume),localStorage.setItem("musicVolume",this.musicVolume.toString()),localStorage.setItem("isMusicMuted",this.isMusicMuted.toString())}},watch:{isMusicMuted:{immediate:!0,handler(){this.adjustMusicVolume()}}}});const Z=(0,h.Z)(W,[["render",K]]);var N=Z;const H={class:"game"},j={key:1,class:"pre-game-timer"};function L(e,t,V,r,a,o){const u=(0,i.up)("ResultsScreen"),q=(0,i.up)("AudioGame");return(0,i.wg)(),(0,i.iD)("div",H,[(0,i._)("div",{class:"game-field",ref:"gameField",onClick:t[2]||(t[2]=(...t)=>e.totalClicksFun&&e.totalClicksFun(...t))},[e.firstGame?((0,i.wg)(),(0,i.iD)("button",{key:0,onClick:t[0]||(t[0]=(...t)=>e.startCountdown&&e.startCountdown(...t))},"START")):(0,i.kq)("",!0),e.gamePreTime?((0,i.wg)(),(0,i.iD)("p",j,(0,g.zw)(e.gamePreTime),1)):(0,i.kq)("",!0),(0,i.wy)((0,i._)("div",{class:(0,g.C_)(["game-core",{"disable-core":!e.gamePlaying}]),ref:"gameCore",onClick:t[1]||(t[1]=(...t)=>e.coreClicked&&e.coreClicked(...t))},null,2),[[s.F8,e.showCore]])],512),(0,i._)("p",null,"Score: "+(0,g.zw)(e.gameScore),1),(0,i._)("p",null,"Time left: "+(0,g.zw)(e.timerCurrVal.toFixed(2)),1),(0,i.wy)((0,i._)("button",{onClick:t[3]||(t[3]=(...t)=>e.finishGame&&e.finishGame(...t))}," -Finish- ",512),[[s.F8,e.gamePlaying]]),(0,i.Wm)(u,{ref:"resultInfo",onResultsMounted:t[5]||(t[5]=t=>e.$emit("resultsMounted")),finishScreen:e.finishScreen,gameScore:e.gameScore,timeDuration:e.timeDuration,totalClicks:e.totalClicks},{"start-btn":(0,i.w5)((()=>[(0,i._)("button",{onClick:t[4]||(t[4]=(...t)=>e.startCountdown&&e.startCountdown(...t))},"PLAY AGAIN")])),_:1},8,["finishScreen","gameScore","timeDuration","totalClicks"]),(0,i.Wm)(q,{ref:"AudioGame",onAudioGameElements:e.audioGameElements},null,8,["onAudioGameElements"])])}const X=(0,i._)("div",{class:"fs-time-btns"},null,-1),$=(0,i._)("div",{class:"fs-audio"},null,-1),ee=(0,i._)("div",{class:"fs-music"},null,-1),te=(0,i._)("br",null,null,-1),Ve={key:0},se=(0,i._)("p",null,"PERSONAL RECORD",-1),ie=[se],re=(0,i._)("br",null,null,-1),ae=(0,i._)("br",null,null,-1),oe=(0,i._)("br",null,null,-1),ue=(0,i._)("br",null,null,-1),qe=(0,i._)("br",null,null,-1),le={key:1,class:"personal-best"},ne=(0,i._)("br",null,null,-1),ce=(0,i._)("br",null,null,-1),me=(0,i._)("br",null,null,-1);function de(e,t,V,s,r,a){const o=(0,i.up)("ScoreboardComp");return(0,i.wg)(),(0,i.iD)("div",{class:(0,g.C_)(["finish-screen",{"fs-visible":e.finishScreen}])},[X,$,ee,te,e.newPB?((0,i.wg)(),(0,i.iD)("div",Ve,ie)):(0,i.kq)("",!0),(0,i._)("p",null,"Your score: "+(0,g.zw)(e.gameScore),1),(0,i._)("p",null,"Score Per Second: "+(0,g.zw)(e.scorePerSecond.toFixed(2)),1),re,(0,i._)("p",null,"Total Clicks: "+(0,g.zw)(e.totalClicks),1),(0,i._)("p",null,"Missed Clicks: "+(0,g.zw)(e.missedClicks),1),ae,(0,i._)("p",null,"Accuracy: "+(0,g.zw)((100*e.accuracy).toFixed(2))+"%",1),(0,i._)("p",null,"Clicks Per Second: "+(0,g.zw)(e.CPS.toFixed(2)),1),oe,(0,i._)("p",null,(0,g.zw)(e.currResName),1),(0,i._)("p",null,(0,g.zw)(e.currResSize),1),(0,i._)("p",null,(0,g.zw)(e.currResLifespan),1),(0,i._)("p",null,(0,g.zw)(e.currResExamples),1),(0,i._)("p",null,(0,g.zw)(e.currResFunFact),1),ue,(0,i.WI)(e.$slots,"start-btn"),qe,e.personalBestScores.length>0?((0,i.wg)(),(0,i.iD)("div",le,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.personalBestScores,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{key:t},[(0,i._)("p",null,(0,g.zw)(e.pb?e.pb:"---"),1),(0,i._)("p",null,(0,g.zw)(e.pbSec?e.pbSec:"---"),1)])))),128))])):(0,i.kq)("",!0),ne,ce,me,(0,i.Wm)(o,{ref:"saveResults",onPbScores:e.pbScores,timeDuration:e.timeDuration,gameScore:e.gameScore,scorePerSecond:e.scorePerSecond,accuracy:e.accuracy,CPS:e.CPS},null,8,["onPbScores","timeDuration","gameScore","scorePerSecond","accuracy","CPS"])],2)}const he={class:"scoreboards"},Ae=(0,i._)("h3",null,"Scoreboard",-1),pe=(0,i._)("thead",null,[(0,i._)("tr",null,[(0,i._)("th"),(0,i._)("th",null,"Score"),(0,i._)("th",null,"Score/sec"),(0,i._)("th",null,"Accuracy"),(0,i._)("th",null,"Clicks/Sec")])],-1),ge=(0,i._)("tr",null,[(0,i._)("th",{colspan:"5"},"Average")],-1),Se=(0,i._)("tr",null,[(0,i._)("th"),(0,i._)("th",null,"Score"),(0,i._)("th",null,"Score/sec"),(0,i._)("th",null,"Accuracy"),(0,i._)("th",null,"Clicks/Sec")],-1),we=(0,i._)("td",null,null,-1);function fe(e,t,V,r,a,o){return(0,i.wg)(),(0,i.iD)(i.HY,null,[e.showSbBtn?((0,i.wg)(),(0,i.iD)("button",{key:0,onClick:t[0]||(t[0]=t=>e.showScoreboard=!e.showScoreboard)}," [ Scoreboard ] ")):(0,i.kq)("",!0),(0,i.wy)((0,i._)("div",he,[(0,i._)("button",{onClick:t[1]||(t[1]=(...t)=>e.clearScoreboard&&e.clearScoreboard(...t))},"Clear Scoreboard"),Ae,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.scoreboardsFilter,(e=>((0,i.wg)(),(0,i.iD)("div",{key:e.name},[(0,i._)("h4",null,(0,g.zw)(e.name),1),(0,i._)("table",null,[pe,(0,i._)("tbody",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.data,((e,t)=>((0,i.wg)(),(0,i.iD)("tr",{key:e.score},[(0,i._)("td",null,(0,g.zw)(t+1),1),(0,i._)("td",null,(0,g.zw)(e.score),1),(0,i._)("td",null,(0,g.zw)(e.sps),1),(0,i._)("td",null,(0,g.zw)(e.accuracy)+"%",1),(0,i._)("td",null,(0,g.zw)(e.cps),1)])))),128))]),(0,i._)("tfoot",null,[ge,Se,(0,i._)("tr",null,[we,(0,i._)("td",null,(0,g.zw)(e.averages.score.toFixed(2)),1),(0,i._)("td",null,(0,g.zw)(e.averages.sps.toFixed(2)),1),(0,i._)("td",null,(0,g.zw)(e.averages.accuracy.toFixed(2))+"%",1),(0,i._)("td",null,(0,g.zw)(e.averages.cps.toFixed(2)),1)])])])])))),128))],512),[[s.F8,e.showScoreboard&&e.showSbBtn]])],64)}V(7658);var ke=(0,i.aZ)({name:"ScoreboardComp",emits:["pbScores"],data(){return{ping:0,showScoreboard:!1,showSbBtn:!1,personalBestScores:[{pb:0,pbSec:0,uniqueIndex:0,firstGame:!1},{pb:0,pbSec:0,uniqueIndex:0,firstGame:!1},{pb:0,pbSec:0,uniqueIndex:0,firstGame:!1}]}},props:["timeDuration","gameScore","scorePerSecond","accuracy","CPS"],methods:{checkTimeDuration(){let e="";switch(this.timeDuration){case 10:e="scoreboardA";break;case 30:e="scoreboardB";break;case 60:e="scoreboardC";break}return e},getScoreboard(e){return localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)):[]},avgScore(e){const t=e.length;if(0===t)return null;const V=e.reduce(((e,t)=>(e.score+=parseFloat(t.score),e.sps+=parseFloat(t.sps),e.accuracy+=parseFloat(t.accuracy),e.cps+=parseFloat(t.cps),e)),{score:0,sps:0,accuracy:0,cps:0});return{score:V.score/t,sps:V.sps/t,accuracy:V.accuracy/t,cps:V.cps/t}},personalBest(){this.scoreboards.forEach(((e,t)=>{if(e.data.length>0){this.showSbBtn=!0;const V=Math.max(...e.data.map((e=>e.score))),s=Math.max(...e.data.map((e=>e.sps))),i=e.data.filter((e=>e.score===V)).length;let r=!1;e.data.length<=1&&(r=!0),this.personalBestScores[t].pb=V,this.personalBestScores[t].pbSec=s,this.personalBestScores[t].uniqueIndex=i,this.personalBestScores[t].firstGame=r}})),this.$emit("pbScores",this.personalBestScores)},saveResults(){const e=this.checkTimeDuration(),t=localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)):[],V={score:this.gameScore,sps:this.scorePerSecond.toFixed(2),accuracy:(100*this.accuracy).toFixed(2),cps:this.CPS.toFixed(2)};t.push(V),localStorage.setItem(e,JSON.stringify(t)),this.ping++,this.personalBest()},clearScoreboard(){this.showSbBtn=!1,this.showScoreboard=!1,this.scoreboards.forEach(((e,t)=>{localStorage.removeItem("scoreboard"+e.id)})),this.personalBestScores=this.personalBestScores.map((()=>({pb:0,pbSec:0,uniqueIndex:0,firstGame:!1}))),this.$emit("pbScores",this.personalBestScores),this.ping++}},computed:{scoreboards(){this.ping;const e=[{id:"A",name:"10 seconds",data:this.getScoreboard("scoreboardA"),averages:this.avgScore(this.getScoreboard("scoreboardA"))},{id:"B",name:"30 seconds",data:this.getScoreboard("scoreboardB"),averages:this.avgScore(this.getScoreboard("scoreboardB"))},{id:"C",name:"60 seconds",data:this.getScoreboard("scoreboardC"),averages:this.avgScore(this.getScoreboard("scoreboardC"))}];return e},scoreboardsFilter(){return this.scoreboards.filter((e=>e.data.length>0))}}});const be=(0,h.Z)(ke,[["render",fe]]);var Ie=be,Me=(0,i.aZ)({name:"ResultsScreen",emits:["resultsMounted"],components:{ScoreboardComp:Ie},data(){return{resultItems:[{name:"Black Hole",lifespan:"",size:"",examples:"",funFacts:["","",""]},{name:"Pulsar",lifespan:"",size:"",examples:"",funFacts:["","",""]},{name:"Blue Giant",lifespan:"",size:"",examples:"",funFacts:["","",""]},{name:"Red Giant",lifespan:"",size:"",examples:"",funFacts:["","",""]},{name:"Yellow Dwarf",lifespan:"",size:"",examples:"",funFacts:["","",""]},{name:"Red Dwarf",lifespan:"10 days",size:"1 km",examples:"XxX",funFacts:["FunFact1","FunFact2","FunFact3"]}],currResItem:0,randNum:0,currResName:"",currResLifespan:"",currResSize:"",currResExamples:"",currResFunFact:"",personalBestScores:[],scoreIndex:0,newPB:!1}},props:["finishScreen","timeDuration","gameScore","totalClicks"],mounted(){this.$emit("resultsMounted")},methods:{resultInfo(){switch(!0){case this.scorePerSecond>=2.75:this.currResItem=0;break;case this.scorePerSecond>=2.25:this.currResItem=1;break;case this.scorePerSecond>=1.75:this.currResItem=2;break;case this.scorePerSecond>=1.25:this.currResItem=3;break;case this.scorePerSecond>=.75:this.currResItem=4;break;case this.scorePerSecond<.75:this.currResItem=5;break}const e=this.resultItems[this.currResItem];this.currResName=e.name,this.currResLifespan=e.lifespan,this.currResSize=e.size,this.currResExamples=e.examples,this.randNum=Math.floor(3*Math.random()),this.currResFunFact=e.funFacts[this.randNum],this.$refs.saveResults.personalBest()},saveResults(){this.$refs.saveResults.saveResults()},pbScores(e){switch(this.personalBestScores=e,this.timeDuration){case 10:this.scoreIndex=0;break;case 30:this.scoreIndex=1;break;case 60:this.scoreIndex=2;break}const t=this.personalBestScores[this.scoreIndex];t.pb==this.gameScore&&t.uniqueIndex<=1&&!1===t.firstGame?this.newPB=!0:this.newPB=!1}},computed:{scorePerSecond(){return this.gameScore/this.timeDuration},accuracy(){return this.totalClicks?this.gameScore/this.totalClicks:0},CPS(){return this.totalClicks/this.timeDuration},missedClicks(){return this.totalClicks-this.gameScore}}});const Ce=(0,h.Z)(Me,[["render",de]]);var Ge=Ce;const Te=["src"],ye=["src"],Be=["src"];function Ee(e,t,V,s,r,a){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("audio",{class:"gameplay-audio",ref:"startAudioElem",src:e.startAudioSrc},null,8,Te),(0,i._)("audio",{class:"gameplay-audio",ref:"preTimeAudioElem",src:e.preTimeAudioSrc},null,8,ye),(0,i._)("audio",{class:"gameplay-audio",ref:"finishAudioElem",src:e.finishAudioSrc},null,8,Be)],64)}var De=(0,i.aZ)({name:"AudioGame",emits:["audioGameElements"],data(){return{startAudioSrc:V(282),preTimeAudioSrc:V(4700),clickAudioSrc:V(1110),finishAudioSrc:V(3784),clickAudioPool:[],clickAudioMax:10,masterVolume:1,isMuted:!1}},mounted(){for(let e=0;e<this.clickAudioMax;e++){const e=new Audio(this.clickAudioSrc);this.clickAudioPool.push(e)}this.$emit("audioGameElements",{start:this.$refs.startAudioElem,preTime:this.$refs.preTimeAudioElem,finish:this.$refs.finishAudioElem})},methods:{playClickSound(){const e=this.clickAudioPool.find((e=>e.paused||e.ended));this.masterVolume=null!==localStorage.getItem("masterVolume")?Number(localStorage.getItem("masterVolume")):1,this.isMuted="true"===localStorage.getItem("isMuted")||(localStorage.getItem("isMuted"),!1),e&&(e.volume=this.isMuted?0:this.masterVolume,e.currentTime=0,e.play())}}});const Ye=(0,h.Z)(De,[["render",Ee]]);var Fe=Ye,xe=(0,i.aZ)({name:"GameField",emits:["firstGame","resultsMounted","startGame"],components:{ResultsScreen:Ge,AudioGame:Fe},data(){return{startAudioElem:null,preTimeAudioElem:null,finishAudioElem:null,timerCurrVal:0,timerInterval:void 0,gamePreTime:"",gamePlaying:!1,showCore:!1,firstGame:!0,finishScreen:!1,gameScore:0,totalClicks:0}},props:["timeDuration"],methods:{audioGameElements(e){this.startAudioElem=e.start,this.preTimeAudioElem=e.preTime,this.finishAudioElem=e.finish},delay(e){return new Promise((t=>setTimeout(t,e)))},async startCountdown(){this.firstGame=!1,this.$emit("firstGame",this.firstGame),this.finishScreen=!1,this.gameScore=0,this.totalClicks=0,this.showCore=!1,this.gamePreTime="3",this.preTimeAudioElem.play(),await this.delay(1e3),this.gamePreTime="2",this.preTimeAudioElem.play(),await this.delay(1e3),this.gamePreTime="1",this.preTimeAudioElem.play(),await this.delay(1e3),this.gamePreTime="START",this.startAudioElem.play(),await this.delay(1e3),this.gamePreTime="",this.startGame(),this.corePosition()},timerFunction(){clearInterval(this.timerInterval),this.timerCurrVal=this.timeDuration,this.timerInterval=setInterval((()=>{this.timerCurrVal-=.01,this.timerCurrVal<=0&&(this.finishGame(),this.$refs.resultInfo.saveResults())}),10)},startGame(){this.gamePlaying=!0,this.showCore=!0,this.timerFunction(),this.$emit("startGame")},finishGame(){clearInterval(this.timerInterval),this.timerCurrVal=0,this.gamePlaying=!1,this.finishScreen=!0,this.finishAudioElem.play(),this.$refs.resultInfo.resultInfo()},corePosition(){const e=this.$refs.gameCore,t=this.$refs.gameField,V=t.offsetWidth,s=t.offsetHeight,i=30,r=Math.floor(i+Math.random()*(V-i-i+1)),a=Math.floor(i+Math.random()*(s-i-i+1));e.style.setProperty("--gc-top",a.toString()+"px"),e.style.setProperty("--gc-left",r.toString()+"px")},coreClicked(){this.corePosition(),this.$refs.AudioGame.playClickSound(),this.gameScore++},totalClicksFun(){this.gamePlaying&&this.totalClicks++}}});const ve=(0,h.Z)(xe,[["render",L]]);var Qe=ve,Re=(0,i.aZ)({name:"App",components:{UserOptions:p,AudioSettings:k,AudioMusic:N,GameField:Qe},data(){return{timeDuration:10,firstGame:!0,resultsMounted:!1}},methods:{timerIsSetFun(e){this.timeDuration=e},isFirstGame(e){this.firstGame=e},resultsMountedFun(){this.resultsMounted=!0},startGame(){this.$refs.AudioMusic.playMusicInit()}}});const Ue=(0,h.Z)(Re,[["render",o]]);var Je=Ue;(0,s.ri)(Je).mount("#app")},1110:function(e,t,V){e.exports=V.p+"media/click.dc9e37eb.flac"},3784:function(e,t,V){e.exports=V.p+"media/finish.0abc043b.mp3"},4700:function(e){e.exports="data:audio/mpeg;base64,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al1WW8mZ1pSxpiHqaGp6Iw7ZlNqVUbgwmGo+xGQ3Iem4dqRqmvvrLt1MQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVAk5HCMuwzHpg09jNOODPScywiMlIzHhgBCDcwUDGDBYJECqHhYgjGKqAuBzYUf/70sQXA+uuEIwt4e3AAAA0gAAABMDjoEpegmBiwrQK6HcgBgGuTYCLGQYNMOHKgy+iEtJBLIvSWyCwx0hKIvuiojWkyhsXdEIBgYwUYEiemooyvVdS5VKktlU1yMnNpLOLkoT9TCjaGZ7jL5ib3TM2xI0FxQ0/m2ErS3CuiRA4w+xPBvksKcdImwjoswyh3jcJeVg6hNRhEBKsniHoxBGSW4npRGwX86EGeJlEpJEO0XUgBKzIPtGqJDT+N4904q3U9I8z2A5qlRH6ij1PYwj3UjHCTpvGybhyJ9WK9KHETkkRQlCUBPy4GuXknRITYPRPqBVtCqQ05jtPU/DrQBeiEivCyjYIwSs6EGeJci2kiHaO0jBPzoR6oZ3kfNmVXMKmUqSO0wT0P9GNLK+esSmXLZeErT+PU7FIxsDG4LShUzHHm2pMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"},282:function(e,t,V){e.exports=V.p+"media/start.9c045997.mp3"},2906:function(e,t,V){e.exports=V.p+"media/02-4mhz-oracle-110554.14311d0b.mp3"},3743:function(e,t,V){e.exports=V.p+"media/action-electronic-beats-148541.8bb6cad6.mp3"},4395:function(e,t,V){e.exports=V.p+"media/black-scorpion-music-quantum-124117.7fec08da.mp3"},6040:function(e,t,V){e.exports=V.p+"media/dark-cinermatic-electro-trailer-dark-engine-141041.124dc8c5.mp3"},6250:function(e,t,V){e.exports=V.p+"media/drive-5957.3190a45c.mp3"},5106:function(e,t,V){e.exports=V.p+"media/insurrection-10941.d87c9073.mp3"},8199:function(e,t,V){e.exports=V.p+"media/rock-the-party-110947.f163d0d9.mp3"},7367:function(e,t,V){e.exports=V.p+"media/subway-15016.1e32aa5c.mp3"}},t={};function V(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,V),r.exports}V.m=e,function(){var e=[];V.O=function(t,s,i,r){if(!s){var a=1/0;for(l=0;l<e.length;l++){s=e[l][0],i=e[l][1],r=e[l][2];for(var o=!0,u=0;u<s.length;u++)(!1&r||a>=r)&&Object.keys(V.O).every((function(e){return V.O[e](s[u])}))?s.splice(u--,1):(o=!1,r<a&&(a=r));if(o){e.splice(l--,1);var q=i();void 0!==q&&(t=q)}}return t}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[s,i,r]}}(),function(){V.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return V.d(t,{a:t}),t}}(),function(){V.d=function(e,t){for(var s in t)V.o(t,s)&&!V.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){V.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){V.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){V.p=""}(),function(){var e={143:0};V.O.j=function(t){return 0===e[t]};var t=function(t,s){var i,r,a=s[0],o=s[1],u=s[2],q=0;if(a.some((function(t){return 0!==e[t]}))){for(i in o)V.o(o,i)&&(V.m[i]=o[i]);if(u)var l=u(V)}for(t&&t(s);q<a.length;q++)r=a[q],V.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return V.O(l)},s=self["webpackChunkrapid_core"]=self["webpackChunkrapid_core"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=V.O(void 0,[998],(function(){return V(4056)}));s=V.O(s)})();
//# sourceMappingURL=app.87c49cda.js.map