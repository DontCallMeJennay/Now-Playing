"use strict"; function handleClientLoad() { gapi.load("client:auth2", initClient) } function initClient() { gapi.client.init({ discoveryDocs: DISCOVERY_DOCS, clientId: CLIENT_ID, scope: SCOPES }).then(function () { gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus), updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()), authorizeButton.onclick = handleAuthClick, signoutButton.onclick = handleSignoutClick }) } function updateSigninStatus(t) { var e = document.getElementById("ytable"); document.getElementById("videos"); t ? (authorizeButton.style.display = "none", signoutButton.style.display = "block", e.style.display = "initial", getSubscriptions()) : (authorizeButton.style.display = "block", signoutButton.style.display = "none", e.style.display = "none", videos.style.backgroundColor = "white", videos.style.color = "black", vm.ytResults = [{}]) } function handleAuthClick(t) { gapi.auth2.getAuthInstance().signIn() } function handleSignoutClick(t) { gapi.auth2.getAuthInstance().signOut() } function getSubscriptions() { gapi.client.youtube.subscriptions.list({ part: "snippet,contentDetails", mine: "true", maxResults: 20 }).then(function (t) { vm.setVideoList(t.result.items) }) } Vue.component("control-panel", { props: { setView: { type: Function, required: !0 } }, data: function () { return { twitch_signedIn: !0, youtube_signedIn: !0, steam_signedIn: !0 } }, template: '\n        <section class="tabs">\n        <p id="msg"></p>\n            <button class="page-btn" id="games" @click="setView(\'twitch\')"><i class="fa fa-2x fa-twitch" aria-hidden="true"></i></button>\n            <button class="page-btn" id="videos" @click="setView(\'youtube\')"><i class="fa fa-2x fa-youtube-play" aria-hidden="true"></i></button>\n            \x3c!--\n            <button class="page-btn" id="steam"  @click="setView(\'steam\')"><i class="fa fa-2x fa-steam-square" aria-hidden="true"></i></button>\n            --\x3e\n        </section>' }), Vue.component("steam-list", { props: { contentTitle: String, contentData: Array }, data: function () { return { user: this.steamId, signedIn: !1 } }, methods: { clearData: function () { this.signedIn = !1, this.user = "", localStorage.removeItem("steamName"), vm.clearList() }, getSteamId: function () { console.log("click"); var t = document.getElementById("steamNum").value; console.log("uinput: ", t), "" !== t && (this.getSteamInfo(t), localStorage.setItem("steamName", t)) }, getSteamInfo: function (t) { $.ajax({ type: "POST", url: "/steam", headers: { username: t }, success: function (t) { vm.setSteamList(t), this.signedIn = !0, $("#steam").css({ color: "white" }) }, error: function (t) { console.log(t.statusCode) } }) } }, template: '\n            <div class="content" v-if="view===\'steam\'">\n            <h3>Steam table goes here...</h3>\n            <input type="text" id="steamNum" />\n            <button id="#getsteam" @click="getSteamId">Get Steam data</button>\n            <div v-if="this.signedIn === true">\n                <section id="gamelist">\n                    <template v-for="item in contentData[0]">\n                        <p>{{item}}</p>\n                  </template>\n                </section>\n                <section id="friendList">\n                    <template v-for="item in contentData[1]">\n                        <p>{{item}}</p>\n                    </template>\n                </section>\n                </div>\n            </div>\n        ' }), Vue.component("steam-item", { props: ["type"], template: "<p>Testing steam-item {{type}} component</p>" }), Vue.component("twitch-list", { props: { contentTitle: { type: String, required: !0 }, contentData: { type: Array, required: !0 }, getStreamList: { type: Function, required: !0 }, twitchName: { type: String, required: !0 }, view: { type: String, required: !0 } }, data: function () { return { user: this.twitchName, signedIn: !1, err: !1 } }, methods: { getName: function () { var t = document.getElementById("username"); "" !== t.value ? (this.user = t.value.toLowerCase(), vm.getStreamList(this.user), this.signedIn = !0, localStorage.setItem("twitchName", this.user)) : t.placeholder = "Please enter a username!" }, clearData: function () { this.signedIn = !1, this.user = "", localStorage.removeItem("twitchName"), vm.clearList(), $("#games").css({ backgroundColor: "white", color: "#4B367C" }) } }, mounted: function () { var t = localStorage.getItem("twitchName"); t && (this.signedIn = !0, this.user = t) }, template: '    \n        <div class="content" v-show="view===\'twitch\'">\n            <section class="line" v-if="this.signedIn === false">\n                <div><label for="username">Enter Twitch username</label>\n                <input class="tinput" type="text" v-model=user id="username"/>\n                </div>\n                <button class="tbtn" id="twitch-auth" @click=getName()>Get follow list</button></button>\n            </section>\n            <section class="line" v-if="this.signedIn === true">\n                <p id="msg">Showing Twitch.tv stream list for <span class="bigname">{{user}}</span></p>\n                <button class="tbtn" id="twitch-signout" style="display: block;" @click=clearData()>Clear</button>\n            </section>\n        <table class="purple" v-if="this.signedIn === true">\n            <caption class="hidden" aria-hidden="false">{{contentTitle}}</caption>\n                <thead>\n                    <tr>\n                        <th scope="col">Channel</th>\n                        <th scope="col">Name</th>\n                        <th scope="col">Description</th>\n                    </tr>\n                </thead>\n                <tbody>                    \n                    <template v-for="item in contentData">\n                        <twitch-result\n                            :logo="item.logo"\n                            :name="item.display_name"\n                            :status="item.title"\n                            :url="item.url"                                                       \n                        ></twitch-result> \n                    </template>                       \n                </tbody>\n            </table>\n        </div>\n    ' }), Vue.component("twitch-result", { props: ["game", "logo", "name", "status", "url"], template: '<tr class="row">\n                <th scope="row"><img :src="logo" :alt="name + \' stream logo\'"></th>\n                <td><span class="names"><a :href="url"> {{ name }} </a></span></td>\n                <td><span> <a :href="url"> {{ status }} </a></span></td>\n                </tr>' }), Vue.component("youtube-list", { props: { contentTitle: String, contentData: Array, contentType: String, view: { type: String, required: !0 } }, methods: { snip: function (t) { return t.length > 100 ? t.substr(0, 200) + "..." : t } }, template: '\n        <div class="content" v-show="view===\'youtube\'">\n            <div class="line">     \n            <button class="ybtn" id="authorize-button" style="display: block;">Log in to your YouTube account</button>\n            <button class="ybtn" id="signout-button" style="display: block;">Sign out of YouTube</button>\n            </div>\n            <table class="red" id="ytable">\n                <caption class="hidden" aria-hidden="false">{{contentTitle}}</caption>\n                <thead v-if="this.contentData.length > 0">\n                    <tr>\n                        <th scope="col">Channel</th>\n                        <th scope="col">Name</th>\n                        <th scope="col" class="sm-hide">Description</th>\n                    </tr>\n                </thead>\n                <tbody>   \n                    <template v-for="item in contentData">\n                        <template v-if="item.snippet && item.contentDetails.newItemCount > 0">\n                            <youtube-result\n                                :desc="snip(item.snippet.description)" \n                                :logo="item.snippet.thumbnails.default.url" \n                                :name="item.snippet.title" \n                                :newItem="item.contentDetails.newItemCount"                                                                               \n                                :url="item.snippet.resourceId.channelId"                                                       \n                            ></youtube-result> \n                        </template>\n                </template>            \n                </tbody>\n            </table>\n            <p v-if="contentData.length < 1"> No new content was found. <a href="https://www.youtube.com">Go to site</a></p>\n        </div>\n            ' }), Vue.component("youtube-result", { props: { desc: { type: String, default: "No description given" }, logo: String, name: String, newItem: { type: [Number, String], default: 0 }, url: String }, template: '<tr class="row">\n                <th scope="row"><img :src="logo" :alt="name + \' channel logo\'"><span> {{newItem}} </span></th>\n                <td><span class="names"><a :href="\'https://youtube.com/channel/\' + url + \'/videos\'"> {{ name }} </a></span></td>\n                <td class="sm-hide"><span> <a :href="\'https://youtube.com/channel/\' + url + \'/videos\'"> {{ desc }} </a></span></td>\n                </tr>' }); var vm = new Vue({ el: "#vue-app", data: { steamResults: [], twitchResults: [], ytResults: [], twitchName: "", steamId: "", view: "none" }, methods: { setView: function (t) { this.view = t }, setUser: function (t) { this.twitchName = t }, getStreamList: function (t) { $.ajax({ type: "POST", url: "/streams", headers: { username: t }, success: function (t) { vm.setStreamList(t), $("#games").css({ backgroundColor: "#4B367C", color: "white" }) }, error: function (t) { document.getElementById("msg").innerHTML = "ERROR: " + t } }) }, setStreamList: function (t) { if (t.err) document.getElementById("msg").innerHTML = "ERROR: " + t.err; else { for (var e = t[1].length, n = 0; n < e; n++)t[0][n].display_name = t[1][n].display_name, t[0][n].logo = t[1][n].profile_image_url, t[0][n].url = "https://www.twitch.tv/" + t[0][n].display_name; this.twitchResults = t[0].slice(0, e) } }, setSteamList: function (t) { this.steamResults = t }, getVideoList: function (t) { }, setVideoList: function (t) { this.ytResults = t, $("#videos").css({ backgroundColor: "red", color: "white" }) }, clearList: function () { this.twitchResults = [] } }, mounted: function () { var t = localStorage.getItem("twitchName"); t && (this.setUser(t, "twitchName"), this.getStreamList(this.twitchName)) }, template: '\n        <div>\n        <header>\n            <h1>Now Playing!</h1> \n            <control-panel :set-view="setView"></control-panel>\n        </header>\n        <hr />\n\n        <section class="twitch" id="tList">\n            <twitch-list content-title="Twitch.tv" :content-data="twitchResults" :get-stream-list="getStreamList" :view="view" :twitch-name="twitchName">\n            </twitch-list>\n        </section>\n        <section class="you" id="yList">\n            <youtube-list content-title="YouTube" :content-data="ytResults" :view="view">\n            </youtube-list>\n        </section>\n        \x3c!--\n        <section id="sList">\n            <steam-list content-title="Steam" :content-data="steamResults" :view="view">\n            </steam-list>\n        </section>\n    --\x3e\n        </div>\n    ' }), CLIENT_ID = "372774319049-pk9d85udr75rlqcluuq12apdeqtnk8go.apps.googleusercontent.com", DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"], SCOPES = "https://www.googleapis.com/auth/youtube.readonly", authorizeButton = document.getElementById("authorize-button"), signoutButton = document.getElementById("signout-button");