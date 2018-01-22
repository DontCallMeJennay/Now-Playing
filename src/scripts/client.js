var vm = new Vue({
    el: "#vue-app",
    data: {
        steamResults: [],
        twitchResults: [],
        ytResults: [],
        twitchName: "",
        steamId: "",
        view: "none"
    },
    methods: {
        setView: function (str) {
            this.view = str;
        },
        setUser: function (param, str) {
            this[param] = str;
        },
        getName: function () {
            let uname = document.getElementById("username");
            if (uname.value !== "") {
                this.twitchName = uname.value.toLowerCase();
                this.getStreamList(this.twitchName);
                this.signedIn = true;
                localStorage.setItem("twitchName", this.twitchName);
            } else {                
                uname.placeholder = "Please enter a username!";
            }
        },
        getStreamList: function (user) {
            $.ajax({
                type: "POST",
                url: "/streams",
                headers: { "username": user },
                success: function (data) {
                    vm.setStreamList(data);
                    $("#games").css({ "backgroundColor": "#4B367C", "color": "white" });
                },
                error: function (err) {
                    const msg = document.getElementById("msg");
                    msg.innerHTML = "ERROR: " + err;
                }
            });
        },
        setStreamList: function (data) {
            if (data.err) {
                var msg = document.getElementById("msg");
                msg.innerHTML = "ERROR: " + data.err;
            } else {
                let len = data[1].length;
                for (var i = 0; i < len; i++) {
                    data[0][i]["display_name"] = data[1][i]["display_name"];
                    data[0][i]["logo"] = data[1][i]["profile_image_url"];
                    data[0][i]["url"] = "https://www.twitch.tv/" + data[0][i]["display_name"];

                }
                this.twitchResults = data[0].slice(0, len);
            }
        },
        getSteamId: function () {
            let uinput = document.getElementById("steamNum").value;
            if (uinput !== "") {
                this.steamId = uinput;
                this.getSteamInfo(uinput);                
                localStorage.setItem("steamId", uinput);
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
                    $("#steam").css({ "backgroundColor": "#495665", "color": "white" });                    
                    
                },
                error: function (err) {
                    console.log(err.statusCode);
                }
            });
        },
        setSteamList: function (data) {
            this.steamResults = data;
        },
        getVideoList: function (user) {
            //Thanks to Google API code, the videos pretty much get themselves.
        },
        setVideoList: function (data) {
            this.ytResults = data;
            $("#videos").css({ "backgroundColor": "red", "color": "white" });

        },
        clearList: function (user, param) {
            this[user] = "";
            this[param] = [];
        }
    },
    mounted() {
        let x = localStorage.getItem("twitchName");
        if (x) {
            this.setUser(x, "twitchName");
            this.getStreamList(this.twitchName);
        }
        let y = localStorage.getItem("steamId");
        if (y) {
            this.setUser(y, "steamId");
            this.getSteamInfo(this.steamId);
        }
    },
    template: `
        <div>
        <header>
            <h1>Now Playing!</h1>             
        </header>
        <control-panel :set-view="setView" :twitch-name="twitchName" :steam-id="steamId" :get-name="getName" :get-steam-id="getSteamId" :clear-list="clearList"></control-panel>
        <hr />

        <section class="twitch" id="tList">
            <twitch-list content-title="Twitch.tv" :content-data="twitchResults" :get-stream-list="getStreamList" :set-user="setUser" :view="view" :twitch-name="twitchName" :clear-list="clearList">
            </twitch-list>
        </section>
        <section class="you" id="yList">
            <youtube-list content-title="YouTube" :content-data="ytResults" :view="view">
            </youtube-list>
        </section>
        <section id="sList">
            <steam-list content-title="Steam" :content-data="steamResults" :view="view" :get-steam-info="getSteamInfo" :steam-id="steamId" :clear-list="clearList">
            </steam-list>
        </section>
        </div>
    `
});
