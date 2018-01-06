Vue.component("control-panel", {
    props: {
        setView: {
            type: Function,
            required: true
        }
    },
    data: function() {
        return {
            twitch_signedIn: true,
            youtube_signedIn: true,
            steam_signedIn: true
        }
    },  
    template: `
        <section class="tabs">
        <p id="msg"></p>
            <button class="page-btn" id="games" @click="setView('twitch')"><i class="fa fa-2x fa-twitch" aria-hidden="true"></i></button>
            <button class="page-btn" id="videos" @click="setView('youtube')"><i class="fa fa-2x fa-youtube-play" aria-hidden="true"></i></button>
            <!--
            <button class="page-btn" id="steam"  @click="setView('steam')"><i class="fa fa-2x fa-steam-square" aria-hidden="true"></i></button>
            -->
        </section>`
})
