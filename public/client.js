Vue.component("twitch-list", {
    props: ["content-title", "content-data", "content-type", "twitchName"],
    methods: {
        getName: function () {
            if (document.getElementById("username") !== "") {
                let twitchName = document.getElementById("username").value.toLowerCase();
                console.log(twitchName);
                //getStreamList(twitchName);
            }
        }
    },
    template: `
        <div class="content">
        <label for="username">Enter Twitch.tv username</label>
        <input type="text" v-model=twitchName id="username"/>
        <button class="btn-filter" id="twitch-auth" style="display: block;" @click=getName()>Get follow list</button></button>
        <button class="btn-filter" id="twitch-signout" style="display: block;">Sign Out T</button>
            <table>
            <caption class="hidden" aria-hidden="false">{{contentTitle}}</caption>
                <thead>
                    <tr>
                        <th scope="col">Channel</th>
                        <th scope="col">Name</th>
                        <th scope="col">Game</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>                    
                    <template v-for="item in contentData">
                        <twitch-result
                            :game="item.game"
                            :logo="item.logo"
                            :name="item.display_name"
                            :status="item.status"
                            :url="item.url"                                                       
                        ></twitch-result> 
                    </template>                       
                </tbody>
            </table>
        </div>
    `
})

Vue.component("youtube-list", {
    props: {
        contentTitle: String,
        contentData: Array,
        contentType: String
    },
    methods: {
        snip: function (string) {
            if (string.length > 100) { return string.substr(0, 200) + "..."; }
            else { return string; }
        }
    },
    template: `
        <div class="content">
            <table>
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
                    <template v-if="item.snippet && item.contentDetails.newItemCount > 0">
                        <youtube-result
                            :desc="snip(item.snippet.description)" 
                            :logo="item.snippet.thumbnails.default.url" 
                            :name="item.snippet.title" 
                            :newItem="item.contentDetails.newItemCount"                                                                               
                            url="https://www.youtube.com"                                                       
                        ></youtube-result> 
                    </template>
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
                <td><span class="names"><a :href="url"> {{ name }} </a></span></td>
                <td><span class="sm-hide"> <a :href="url"> {{ desc }} </a></span></td>
                </tr>`,
})

var vm = new Vue({
    el: "#vue-app",
    data: {
        twitchResults: [{

        }],
        ytResults: [{

        }],
        twitchName: ""
    },
    methods: {
        setUser: function(user) {
            this.twitchName = user;
        },
        getStreamList: function (user) {
            let follows = "";
            $.get("/streams", function (data) {
            }).then((data) => {
                this.setStreamList(data);
                $("#games").css({ "color": "#4B367C" });
            });
        },
        setStreamList: function (data) {
            data = data.filter((i) => i.status !== "stream offline");
            this.twitchResults = data;
        },
        getVideoList: function (user) {
            $.get("/videos", function (data) {
            }).then((data) => {
                this.setVideoList(data);
                $("#videos").css({ "color": "red" });
            });
        },
        setVideoList: function (data) {
            this.ytResults = data;
        }
    },
    mounted() {
        this.getStreamList();
    }
})

/*
The following code is from the YouTube Data API quickstart guide, with some slight modifications.
See https://developers.google.com/youtube/v3/quickstart/js.
*/

var CLIENT_ID = '372774319049-v8c698o1ntn42gctbgm8semjcsgapg3o.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        getSubscriptions();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function getSubscriptions() {
    gapi.client.youtube.subscriptions.list({
        'part': 'snippet,contentDetails',
        'mine': 'true',
        'maxResults': 20
    }).then(function (response) {
        vm.setVideoList(response.result.items);
    });
}

$("document").ready(function () {
    $('#games').on('click', function () {
        $('#tList').slideToggle(500);
        $('#yList').slideUp(500);
        $(this).addClass('btn-lit');
        $('#videos').removeClass('btn-lit');
    });
    $('#videos').on('click', function () {
        $('#yList').slideToggle(500);
        $('#tList').slideUp(500);
        $(this).addClass('btn-lit');
        $('#games').removeClass('btn-lit');
    });
});