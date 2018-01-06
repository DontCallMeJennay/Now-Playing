
/*
The following code is from the YouTube Data API quickstart guide, with some slight modifications.
See https://developers.google.com/youtube/v3/quickstart/js.
*/

var CLIENT_ID = "372774319049-pk9d85udr75rlqcluuq12apdeqtnk8go.apps.googleusercontent.com";
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
    let table = document.getElementById("ytable");
    let button = document.getElementById("videos");
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        table.style.display = 'initial';
        getSubscriptions();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';  
        table.style.display = 'none';
        videos.style.backgroundColor = "white";   
        videos.style.color = "black";        
        vm.ytResults = [{}];
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
