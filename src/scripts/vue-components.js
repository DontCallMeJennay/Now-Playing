Vue.component("control-panel", {
    props: {
        setView: {
            type: Function,
            required: true
        }
    },
    data: function() {
        return {
            twitch_signedIn: true,
            youtube_signedIn: true,
            steam_signedIn: true
        }
    },  
    template: `
        <section class="tabs">
        <p id="msg"></p>
            <button class="page-btn" id="games" @click="setView('twitch')"><i class="fa fa-2x fa-twitch" aria-hidden="true"></i></button>
            <button class="page-btn" id="videos" @click="setView('youtube')"><i class="fa fa-2x fa-youtube-play" aria-hidden="true"></i></button>
            <!--
            <button class="page-btn" id="steam"  @click="setView('steam')"><i class="fa fa-2x fa-steam-square" aria-hidden="true"></i></button>
            -->
        </section>`
})

Vue.component("steam-list", {
    props: {
        contentTitle: String,
        contentData: Array
    },
    data: function () {
        return {
            user: this.steamId,
            signedIn: false
        }
    },
    methods: {
        clearData: function () {
            this.signedIn = false;
            this.user = "";
            localStorage.removeItem("steamName");
            vm.clearList();
        },
        getSteamId: function () {
            console.log("click");
            let uinput = document.getElementById("steamNum").value;
            console.log("uinput: ", uinput);
            if (uinput !== "") {
                this.getSteamInfo(uinput);                
                localStorage.setItem("steamName", uinput);
            }
        },
        getSteamInfo: function (user) {
            $.ajax({
                type: "POST",
                url: "/steam",
                headers: { "username": user },
                success: function (data) {
                    vm.setSteamList(data);
                    this.signedIn = true;
                    $("#steam").css({ "color": "white" });
                },
                error: function (err) {
                    console.log(err.statusCode);
                }
            });
        }
    },
    template: `
            <div class="content" v-if="view==='steam'">
            <h3>Steam table goes here...</h3>
            <input type="text" id="steamNum" />
            <button id="#getsteam" @click="getSteamId">Get Steam data</button>
            <div v-if="this.signedIn === true">
                <section id="gamelist">
                    <template v-for="item in contentData[0]">
                        <p>{{item}}</p>
                  </template>
                </section>
                <section id="friendList">
                    <template v-for="item in contentData[1]">
                        <p>{{item}}</p>
                    </template>
                </section>
                </div>
            </div>
        `
});

Vue.component("steam-item", {
    props: ["type"],
    template: `<p>Testing steam-item {{type}} component</p>`
});
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
            <div class="line">     
            <button class="ybtn" id="authorize-button" style="display: block;">Log in to your YouTube account</button>
            <button class="ybtn" id="signout-button" style="display: block;">Sign out of YouTube</button>
            </div>
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