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
    },
    template: `
        <div>
        <section class="twitch" id="tList">
            <twitch-list content-title="Twitch.tv" :content-data="twitchResults" :get-stream-list="getStreamList">
            </twitch-list>
        </section>
        <section id="yList">
            <youtube-list content-title="YouTube" :content-data="ytResults">
            </youtube-list>
        </section>
        <!--
        <section id="sList">
            <steam-list content-title="Steam" :content-data="steamResults">
            </steam-list>
        </section>
    -->
        </div>
    `
});
