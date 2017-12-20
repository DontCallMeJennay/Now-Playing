var vm = new Vue({
    el: "#vue-app",
    data: {
        twitchResults: [],
        ytResults: [],
        steamResults: [],
        twitchName: "",
        steamId: ""
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
            for (var i = 0; i < data[0].length; i++) {
                data[0][i]["display_name"] = data[1][i]["display_name"];
                data[0][i]["logo"] = data[1][i]["profile_image_url"];
            }
            this.twitchResults = data[0];
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
    }
});
