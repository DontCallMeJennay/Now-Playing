Vue.component("twitch-list", {
    props: {
        contentTitle: String,
        contentData: Array,
        contentType: String,
        clearList: Function,
        getStreamList: Function,
        twitchName: String
    },
    data: function () {
        return {
            user: this.twitchName,
            signedIn: false
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
                console.log("Please enter a username");
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
        <div class="content">
            <section v-if="this.signedIn === false">
                <label for="username">Enter Twitch.tv username</label>
                <input type="text" v-model=user id="username"/>
                <button class="btn-filter" id="twitch-auth" @click=getName()>Get follow list</button></button>
            </section>
            <section v-if="this.signedIn === true">
                <span>Signed in as {{user}}</span>
                <button class="btn-filter" id="twitch-signout" style="display: block;" @click=clearData()>Clear Twitch list</button>
            </section>

        <table v-if="this.signedIn === true">
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
                <td><span> {{ game }} </span> </td>
                <td><span class="sm-hide"> <a :href="url"> {{ status }} </a></span></td>
                </tr>`,
})