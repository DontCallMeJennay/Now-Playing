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