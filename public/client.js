Vue.component("tw-result", {
    template: `<tr>
                <td><img :src="logo" :alt="name + ' stream logo'"></td>
                <td class="names"><a :href="url"> {{ name }} </a></td>
                <td class="game"> {{ game }} </span> 
                <td> <a :href="url"> {{ status }} </a></td>
                </tr>`,
    props: ["name", "logo", "chan", "url", "game", "status"]
})

Vue.component("yt-result", {
    template: `<div class="row">
                <img :src="logo" :alt="chan + ' stream logo'">
                <span class='names'><a :href='url'> {{ chan }} </a></span>
                <span> {{ game }} </span> 
                <span class='sm-hide'> <a :href='url'> {{ status }} </a></span>
                </div>`,
    props: ["name", "id", "count", "descr", "icon"]
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
        ytResults: []
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