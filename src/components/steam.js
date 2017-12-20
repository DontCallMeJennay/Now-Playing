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
            <div class="content">
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