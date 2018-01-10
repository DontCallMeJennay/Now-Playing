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
    },
    template: `
        <div>
        <header>
            <h1>Now Playing!</h1>             
        </header>
        <control-panel :set-view="setView"></control-panel>
        <hr />

        <section class="twitch" id="tList">
            <twitch-list content-title="Twitch.tv" :content-data="twitchResults" :get-stream-list="getStreamList" :view="view" :twitch-name="twitchName">
            </twitch-list>
        </section>
        <section class="you" id="yList">
            <youtube-list content-title="YouTube" :content-data="ytResults" :view="view">
            </youtube-list>
        </section>
        <!--
        <section id="sList">
            <steam-list content-title="Steam" :content-data="steamResults" :view="view">
            </steam-list>
        </section>
    -->
        </div>
    `
});
