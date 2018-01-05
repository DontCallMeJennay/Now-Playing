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
