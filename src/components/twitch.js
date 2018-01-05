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
        twitchName: {
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
            user: this.twitchName,
            signedIn: false,
            err: false
        }
    },
    methods: {
        getName: function () {
            let uname = document.getElementById("username");
            if (uname.value !== "") {
                this.user = uname.value.toLowerCase();
                vm.getStreamList(this.user);
                this.signedIn = true;
                localStorage.setItem("twitchName", this.user);
            } else {                
                uname.placeholder = "Please enter a username!";
            }
        },
        clearData: function () {
            this.signedIn = false;
            this.user = "";
            localStorage.removeItem("twitchName");
            vm.clearList();
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
            <section class="line" v-if="this.signedIn === false">
                <div><label for="username">Enter Twitch username</label>
                <input class="tinput" type="text" v-model=user id="username"/>
                </div>
                <button class="tbtn" id="twitch-auth" @click=getName()>Get follow list</button></button>
            </section>
            <section class="line" v-if="this.signedIn === true">
                <p id="msg">Showing Twitch.tv stream list for <span class="bigname">{{user}}</span></p>
                <button class="tbtn" id="twitch-signout" style="display: block;" @click=clearData()>Clear</button>
            </section>
        <table class="purple" v-if="this.signedIn === true">
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
                <td><span class="sm-hide"> <a :href="url"> {{ status }} </a></span></td>
                </tr>`,
})