Vue.component("steam-list", {
    props: {
        contentTitle: String,
        contentData: Array,
        getSteamInfo: {
            type: Function,
            required: true
        },
        steamId: {
            type: String,
            required: true
        },
        view: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {
            signedIn: false
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
            localStorage.removeItem("steamId");
            vm.clearList("steamId", "steamResults");
            $("#steam").css({"backgroundColor": "white", "color": "black"});
        }
    },

    template: `
        <div class="content" v-if="view==='steam'">
            <section class="line" v-if="this.steamId">
            <p id="msg">Showing Steam friend and game lists for ID <span class="bigname">{{this.steamId}}</span></p>
            <button class="stbtn" id="steam-signout" @click=clearData()>Clear</button>
            </section>
            <section class="steam" v-if="this.steamId">
            <table class="gray">
            <caption class="hidden" aria-hidden="false">{{contentTitle}}</caption>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Player</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody v-if="contentData[0]">
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
                <tbody v-if="contentData[1]">
                <template v-for="item in sortedGames">
                    <steam-game
                    :game="item.name"
                    :hours="item.playtime_forever">
                    </steam-game>
                    </template> 
                </tbody>
            </table>
            </section>
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