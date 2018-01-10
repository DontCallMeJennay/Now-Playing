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