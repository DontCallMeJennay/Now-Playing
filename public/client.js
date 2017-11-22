Vue.component("content-list", {
    props: ["content-title", "content-data", "content-type"],
    template: `
        <div class="content">
            <table>
            <caption aria-hidden="false">{{contentTitle}}</caption>
                <thead>
                    <tr>
                        <th scope="col">Channel</th>
                        <th scope="col">Name</th>
                        <th scope="col">{{contentType}}</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item in contentData">
                        <content-result
                            :logo="item.logo"
                            :name="item.display_name"
                            :chan="item.channel"
                            :url="item.url"
                            :game="item.game"
                            :status="item.status"
                        ></content-result>                        
                    </template>
                    <div></div>
                </tbody>
            </table>
        </div>
    `
})

Vue.component("content-result", {
    props: ["logo", "name", "chan", "url", "game", "status"], 
    template:  `<tr class="row">
                <th scope="row"><img :src="logo" :alt="chan + ' stream logo'"></th>
                <td><span> {{name }} </span></td>
                <td><span class="names"><a :href="url"> {{ chan }} </a></span></td>
                <td><span> {{ game }} </span> </td>
                <td><span class="sm-hide"> <a :href="url"> {{ status }} </a></span></td>
                </tr>`,
    
})

var vm = new Vue({
    el: "#vue-app",
    data: {
        twitchResults: [{
            "display_name": "silverrain64",
            "logo": "/public/raincloud.png",
            "chan": "silverrain64",
            "url": "https://twitch.tv/silverrain64",
            "game": "Super Mario World",
            "status": "Testing a web app"
        }],
        ytResults: [{
            "display_name": "silverrain64",
            "logo": "/public/raincloud.png",
            "chan": "silverrain64",
            "url": "https://twitch.tv/silverrain64",
            "game": "Super Mario World",
            "status": "Testing a web app"
        }]
    },
    methods: {
        getStreamList: function(user) {
            let follows = "";
            $.get("/streams", function(data) {
                console.log('getStreamList() return: ', data);
            }).then((data) => {
                this.setStreamList(data);
                $("#games").css({ "color": "#4B367C" });
            });
        },
        setStreamList: function(data) {
            this.twitchResults = data;
        }
    },
    mounted() {
        this.getStreamList();
    }
})

$("document").ready(function() {
    $("#twitch-auth").show()
        .on("click", function() {
            console.log("#twitch-auth clicked");
            let uri = `https://api.twitch.tv/kraken/oauth2/authorize?client_id=kjuxb8d6m4k8sek7vqnfvr3y1694077&redirect_uri=http://localhost/oauth&response_type=token&scope=user_read&force_verify=true`;
            $.get(uri, function(data) {
                console.log("#twitch-auth GET returned");
            });
        });

    $('#games').on('click', function() {
        $('#tList').slideToggle(500);
        $('#yList').slideUp(500);
        $(this).addClass('btn-lit');
        $('#videos').removeClass('btn-lit');
    });
    $('#videos').on('click', function() {
        $('#yList').slideToggle(500);
        $('#tList').slideUp(500);
        $(this).addClass('btn-lit');
        $('#games').removeClass('btn-lit');
    });
});