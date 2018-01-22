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
            twitch_signedIn: true,
            youtube_signedIn: true,
            steam_signedIn: true
        }
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
            <div class="line" v-if="!this.steamId">
            <label for="getsteam">Enter Steam ID</label>
                <input type="text" class="stinput" id="steamNum" />
                <button class="stbtn" id="#getsteam" @click="getSteamId">Get Steam data</button>
            </div>
        </section>
    </div>`
})

Vue.component("steam-list", {
    props: {
        contentTitle: String,
        contentData: Array,
        getSteamInfo: {
            type: Function,
            required: true
        },
        view: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {
            signedIn: false,
            user: this.steamId
        }
    },
    computed: {
        sortedGames: function() {
            return this.contentData[1].response.games.sort((a,b) => b.playtime_forever - a.playtime_forever);
        }
    },
    methods: {
        clearData: function () {
            this.signedIn = false;
            this.user = "";
            localStorage.removeItem("steamId");
            vm.clearList();
        }
    },

    template: `
            <div class="content steam" v-if="view==='steam'">
            <table class="gray">
            <caption class="hidden" aria-hidden="false">{{contentTitle}}</caption>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Player</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item in contentData[0].response.players">
                        <steam-player
                        :logo="item.avatar"
                        :name="item.personaname"
                        :status="item.personastate"
                        >
                        </steam-player>
                    </template>
                </tbody>
            </table>

            <table class="blue">
            <caption class="hidden" aria-hidden="false">{{contentTitle}}</caption>
                <thead>
                    <tr>
                        <th scope="col">Game</th>
                        <th scope="col">Time played</th>
                    </tr>
                </thead>
                <tbody>
                <template v-for="item in sortedGames">
                    <steam-game
                    :game="item.name"
                    :hours="item.playtime_forever">
                    </steam-game>
                    </template> 
                </tbody>
            </table>
        </div>
        `
});

Vue.component("steam-player", {
    props: {
        logo: String,
        name: String,
        status: Number
    },
    template: `<tr v-if="status === 1 || status === 6">
        <td><img :src="logo"></td>
        <td>{{name}}</td>
        <td v-if="status === 1">Online</td>
        <td v-if="status === 6">Looking to play!</td>
        </tr>`
});
Vue.component("steam-game", {
    props: {
        game: String,
        hours: Number
    },
    template: `<tr v-if="hours > 10">
        <td>{{game}}</td>
        <td>{{hours}}</td>
        </tr>`
});
const Ledger = new Vuex.Store({
    state: {
        steamResults: [],
        twitchResults: [],
        ytResults: [],
        twitchName: "",
        steamId: "",
        view: "none"
    },
    mutations: {
        changeTwitchId (str) {
            state.twitchName = str
        },
        changeSteamId (str) {
            state.steamId = str
        },
        changeView (str) {
            state.view = str
        },
    }
})
Vue.component("twitch-list", {
    props: {
        contentTitle: {
            type: String,
            required: true
        },
        contentData: {
            type: Array,
            required: true
        },
        getStreamList: {
            type: Function,
            required: true
        },
        setUser: {
            type: Function,
            required: true
        },
        twitchName: {
            type: String,
            required: true
        },
        view: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            user: this.twitchName,
            err: false,
        }
    },
    methods: {
        clearData: function () {
            this.setUser("");
            localStorage.removeItem("twitchName");
            vm.clearList();
            $("#games").css({"backgroundColor": "white", "color": "#4B367C"});
        }
    },
    mounted() {
        let x = localStorage.getItem("twitchName");
        if (x) {
            this.signedIn = true;
            this.user = x;
        }
    },
    template: `    
        <div class="content" v-show="view==='twitch'">
            <section class="line" v-if="this.twitchName">
                <p id="msg">Showing Twitch.tv stream list for <span class="bigname">{{this.twitchName}}</span></p>
                <button class="tbtn" id="twitch-signout" @click=clearData()>Clear</button>
            </section>
        <table class="purple" v-if="this.twitchName">
            <caption class="hidden" aria-hidden="false">{{contentTitle}}</caption>
                <thead>
                    <tr>
                        <th scope="col">Channel</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>                    
                    <template v-for="item in contentData">
                        <twitch-result
                            :logo="item.logo"
                            :name="item.display_name"
                            :status="item.title"
                            :url="item.url"                                                       
                        ></twitch-result> 
                    </template>                       
                </tbody>
            </table>
        </div>
    `
})

Vue.component("twitch-result", {
    props: ["game", "logo", "name", "status", "url"],   //All strings
    template: `<tr class="row">
                <th scope="row"><img :src="logo" :alt="name + ' stream logo'"></th>
                <td><span class="names"><a :href="url"> {{ name }} </a></span></td>
                <td><span> <a :href="url"> {{ status }} </a></span></td>
                </tr>`,
})
Vue.component("youtube-list", {
    props: {
        contentTitle: String,
        contentData: Array,
        contentType: String,
        view: {
            type: String,
            required: true
        }
    },
    methods: {
        snip: function (string) {
            if (string.length > 100) { return string.substr(0, 200) + "..."; }
            else { return string; }
        }
    },
    template: `
        <div class="content" v-show="view==='youtube'">
            <table class="red" id="ytable">
                <caption class="hidden" aria-hidden="false">{{contentTitle}}</caption>
                <thead v-if="this.contentData.length > 0">
                    <tr>
                        <th scope="col">Channel</th>
                        <th scope="col">Name</th>
                        <th scope="col" class="sm-hide">Description</th>
                    </tr>
                </thead>
                <tbody>   
                    <template v-for="item in contentData">
                        <template v-if="item.snippet && item.contentDetails.newItemCount > 0">
                            <youtube-result
                                :desc="snip(item.snippet.description)" 
                                :logo="item.snippet.thumbnails.default.url" 
                                :name="item.snippet.title" 
                                :newItem="item.contentDetails.newItemCount"                                                                               
                                :url="item.snippet.resourceId.channelId"                                                       
                            ></youtube-result> 
                        </template>
                </template>            
                </tbody>
            </table>
            <p v-if="contentData.length < 1"> No new content was found. <a href="https://www.youtube.com">Go to site</a></p>
        </div>
            `
})


Vue.component("youtube-result", {
    props: {
        desc: {
            type: String,
            default: "No description given"
        },
        logo: String,
        name: String,
        newItem: {
            type: [Number, String],
            default: 0
        },
        url: String
    },
    template: `<tr class="row">
                <th scope="row"><img :src="logo" :alt="name + ' channel logo'"><span> {{newItem}} </span></th>
                <td><span class="names"><a :href="'https://youtube.com/channel/' + url + '/videos'"> {{ name }} </a></span></td>
                <td class="sm-hide"><span> <a :href="'https://youtube.com/channel/' + url + '/videos'"> {{ desc }} </a></span></td>
                </tr>`,
})