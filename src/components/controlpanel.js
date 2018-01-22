Vue.component("control-panel", {
    props: {
        getName: {
            type: Function,
            required: true
        },
        getSteamId: {
            type: Function,
            required: true
        },
        setView: {
            type: Function,
            required: true
        },
        steamId: {
            type: String,
            required: true
        },
        twitchName: String
    },
    data: function () {
        return {

        }
    },
    mounted() {
        console.log(this.steamId);
    },
    template: `
    <div>
        <section class="tabs">
                <button class="page-btn" id="all" @click="setView('all')" disabled><i class="fa fa-asterisk" aria-hidden="true"></i></button>
                <button class="page-btn" id="games" @click="setView('twitch')"><i class="fa fa-2x fa-twitch" aria-hidden="true"></i></button>
                <button class="page-btn" id="videos" @click="setView('youtube')"><i class="fa fa-2x fa-youtube-play" aria-hidden="true"></i></button>
                <button class="page-btn" id="steam"  @click="setView('steam')"><i class="fa fa-2x fa-steam-square" aria-hidden="true"></i></button>
                <button class="page-btn" id="fb"  @click="setView('fb')" disabled><i class="fa fa-2x fa-facebook" aria-hidden="true"></i></button>
                <button class="page-btn" id="steam"  @click="setView('twitter')" disabled><i class="fa fa-2x fa-twitter" aria-hidden="true"></i></button>
        </section>
        <hr />
        <section class="logins">
            <div class="line" v-if="!this.twitchName">
                <label for="username">Enter Twitch username</label>
                <input class="tinput" type="text" id="username"/>
                <button class="tbtn" id="twitch-auth" @click=getName()>Get follow list</button></button>
            </div>
            <hr />
            <div class="line center">     
                <button class="ybtn" id="authorize-button" style="display: block;">Log in to your YouTube account</button>
                <button class="ybtn" id="signout-button" style="display: block;">Sign out of YouTube</button>
            </div>
            <hr />
            <div class="line" v-if="this.steamId === ''">
            <label for="getsteam">Enter Steam ID</label>
                <input type="text" class="stinput" id="steamNum" />
                <button class="stbtn" id="#getsteam" @click="getSteamId">Get Steam data</button>
            </div>
        </section>
    </div>`
})
