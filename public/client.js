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
                            :chan="item.channel"
                            :game="item.game"
                            :logo="item.logo"
                            :name="item.display_name"
                            :status="item.status"
                            :url="item.url"                                                       
                        ></content-result>                        
                    </template>
                    <div></div>
                </tbody>
            </table>
        </div>
    `
})

Vue.component("content-result", {
    props: ["chan", "game", "logo", "name", "newItems", "status", "url"],
    template: `<tr class="row">
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
        twitchProps: ["chan", "game", "logo", "name", "status", "url"],
        ytProps: ["desc", "logo", "name", "newItems", "url"],
        twitchResults: [{
            "chan": "silverrain64",
            "display_name": "silverrain64",
            "logo": "/public/raincloud.png",
            "game": "Super Mario World",                        
            "status": "Testing a web app",
            "url": "https://twitch.tv/silverrain64"
        }],
        ytResults: [{
            "desc": "Making this up as I go",
            "logo": "/public/raincloud.png",
            "name": "silverrain64",                    
            "newItems": 0,
            "url": "https://jennicorbus.com"
        }]
    },
    methods: {
        getStreamList: function (user) {
            let follows = "";
            $.get("/streams", function (data) {
                console.log('getStreamList() return: ', data);
            }).then((data) => {
                this.setStreamList(data);
                $("#games").css({ "color": "#4B367C" });
            });
        },
        setStreamList: function (data) {
            this.twitchResults = data;
        },
        setVideoList: function (data) {
            this.ytResults = data;
            console.log(this.ytResults);
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
        signoutButton.style.display = 'none';
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
    $("#twitch-auth").show()
        .on("click", function () {
            console.log("#twitch-auth clicked");
            let uri = `https://api.twitch.tv/kraken/oauth2/authorize?client_id=kjuxb8d6m4k8sek7vqnfvr3y1694077&redirect_uri=http://localhost/oauth&response_type=token&scope=user_read&force_verify=true`;
            $.get(uri, function (data) {
                console.log("#twitch-auth GET returned");
            });
        });

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