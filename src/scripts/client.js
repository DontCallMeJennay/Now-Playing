const steamModule = {
    namespaced: true,
    state: {
        active: true,
        results: [],
        signedIn: false,
        username: "76561198010153724"
    },
    mutations: {
        changeName(state, str) {
            this.state.s.username = str
        },
        makeActive(state, bool) {
            this.state.s.active = bool
        },
        signedIn(state, bool) {
            this.state.s.signedIn = bool
        },
        update(state, payload) {
            this.state.s.results = payload
        }
    }
}

const twitchModule = {
    namespaced: true,
    state: {
        active: true,
        results: [],
        signedIn: false,
        username: "silverrain64"
    },
    mutations: {
        changeName(state, str) {
            this.state.t.username = str
        },
        makeActive(state, bool) {
            this.state.t.active = bool
        },
        signedIn(state, bool) {
            this.state.t.signedIn = bool
        },
        update(state, payload) {
            this.state.t.results = payload
        }
    }
}

const youtubeModule = {
    namespaced: true,
    state: {
        active: true,
        results: [],
        signedIn: false
    },
    mutations: {
        makeActive(state, bool) {
            this.state.y.active = bool
        },
        signedIn(state, bool) {
            this.state.y.signedIn = bool
        },
        update(state, payload) {
            this.state.y.results = payload
        }
    }
}

var Ledger = new Vuex.Store({
    namespaced: true,
    modules: {
        s: steamModule,
        t: twitchModule,
        y: youtubeModule
    }
})

var vm = new Vue({
    el: "#vue-app",
    store: Ledger,
    data: {
        steamResults: Ledger.state.s.results,
        twitchResults: Ledger.state.t.results,
        ytResults: Ledger.state.y.results,
        twitchName: Ledger.state.t.username,
        steamId: Ledger.state.s.username
    },
    methods: {
        setUser: function (user) {
            this.twitchName = user;
        },
        getStreamList: function (user) {
            $.ajax({
                type: "POST",
                url: "/streams",
                headers: { "username": user },
                success: function (data) {
                    vm.setStreamList(data);
                    $("#games").css({ "color": "#4B367C" });
                },
                error: function (err) {
                    console.error(err);
                }
            });
        },
        setStreamList: function (data) {
            let len = data[1].length;            
            for (var i = 0; i < len; i++) {
                data[0][i]["display_name"] = data[1][i]["display_name"];
                data[0][i]["logo"] = data[1][i]["profile_image_url"];
                data[0][i]["url"] = "https://www.twitch.tv/" + data[0][i]["display_name"];
                
            }
            this.twitchResults = data[0].slice(0, len);
        },
        setSteamList: function (data) {
            this.steamResults = data;
            console.log("steamResults: ", data);
        },
        getVideoList: function (user) {
            //Thanks to Google API code, the videos pretty much get themselves.
        },
        setVideoList: function (data) {
            this.ytResults = data;
            $("#videos").css({ "color": "red" });

        },
        clearList: function () {
            this.twitchResults = [];
        }
    },
    mounted() {
        let x = localStorage.getItem("twitchName");
        if (x) {
            this.setUser(x, "twitchName");
            this.getStreamList(this.twitchName);
        }
    }
});
