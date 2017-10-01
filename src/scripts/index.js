$("document").ready(function() {

    $("#tList, #yList").hide();

    function checkTwitch() {
        function getStreamList(user) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: `https://api.twitch.tv/kraken/users/${user}/follows/channels?limit=100&sortby=last_broadcast`,
                headers: { 'Client-ID': 'kjuxb8d6m4k8sek7vqnfvr3y1694077' },
                success: function(data) {
                    var len = data.follows.length;
                    //console.log(data);
                    for (let i = 0; i < len; i++) {
                        let name = (data.follows[i].channel.name).toString();
                        seeWhosLive(name);
                    }
                }
            });
        }

        function seeWhosLive(name) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: 'https://api.twitch.tv/kraken/streams/' + name,
                headers: { 'Client-ID': 'kjuxb8d6m4k8sek7vqnfvr3y1694077' },
                success: function(data) {
                    if (data.stream) {
                        var logo = data.stream.channel.logo;
                        var chan = data.stream.channel.display_name;
                        var game = data.stream.channel.game;
                        var url = data.stream.channel.url;
                        var status = data.stream.channel.status;
                        //console.log(streamer + " is online");
                        $('.twitch').append(
                            `<tr>
                        	<td><img src="${logo}" alt="${chan}'s stream logo"></td>
                        	<td class="names"><a href="${url}">${chan}</a></td>
                        	<td>${game}</td>
                        	<td class='sm-hide'><a href="${url}">${status}</a></td>
                        	</tr>`);
                        //console.log(data);
                    }
                    $('#games').css({'color': '#4B367C'});
                }
            });
        }

        getStreamList('silverrain64');
    }

    checkTwitch();

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
    }).then(function() {
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
    }).then(function(response) {
        var yt = document.getElementById('yt');
        var subs = response.result.items;
        var len = subs.length;
        for (var i = 0; i < len; i++) {
            var name = subs[i].snippet.title;
            var id = subs[i].snippet.resourceId.channelId;
            var count = subs[i].contentDetails.newItemCount;
            var descr = (subs[i].snippet.description).substring(0, 100) + '...';
            var icon = subs[i].snippet.thumbnails.default.url;
            var a = `<tr><td class='red'><img src=${icon}>${count}</td>`;
            var b = `<tr><td><img src=${icon}></td>`;
            var str;
            count > 0 ? str = a : str = b;
            str += `<td class='names'><a href='https://www.youtube.com/channel/${id}'>${name}</a></td>
            				<td class='sm-hide'>${descr}</td>
            				</tr>`;
            yt.innerHTML += str;
        }
    }).then(function() {
    	$('#videos').css({'color': '#900'});
    });
}