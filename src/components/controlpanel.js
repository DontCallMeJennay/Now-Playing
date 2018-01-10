Vue.component("control-panel", {
    props: {
        setView: {
            type: Function,
            required: true
        }
    },
    data: function () {
        return {
            twitch_signedIn: true,
            youtube_signedIn: true,
            steam_signedIn: true
        }
    },
    template: `
    <div>
        <section class="tabs">
            <p id="msg"></p>
                <button class="page-btn" id="games" @click="setView('twitch')"><i class="fa fa-2x fa-twitch" aria-hidden="true"></i></button>
                <button class="page-btn" id="videos" @click="setView('youtube')"><i class="fa fa-2x fa-youtube-play" aria-hidden="true"></i></button>
                <!--
                <button class="page-btn" id="steam"  @click="setView('steam')"><i class="fa fa-2x fa-steam-square" aria-hidden="true"></i></button>
                -->
        </section>
        <hr />
        <section class="logins">
            <div class="line">
                <label for="username">Enter Twitch username</label>
                <input class="tinput" type="text" v-model=user id="username"/>
                <button class="tbtn" id="twitch-auth" @click=getName()>Get follow list</button></button>
            </div>
            <hr />
            <div class="line center">     
                <button class="ybtn" id="authorize-button" style="display: block;">Log in to your YouTube account</button>
                <button class="ybtn" id="signout-button" style="display: block;">Sign out of YouTube</button>
            </div>
        </section>
    </div>`
})
