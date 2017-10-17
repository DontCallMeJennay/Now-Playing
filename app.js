Vue.component('tw-result', {
    template:  `<div class='row'>
                <img :src='logo' :alt='chan + " stream logo"'>
                <span> {{ name }} </span>
                <span class='names'><a :href='url'> {{ chan }} </a></span>
                <span> {{ game }} </span> 
                <span class='sm-hide'> <a :href='url'> {{ status }} </a></span>
                </div>`,
    props: ['name', 'logo', 'chan', 'url', 'game', 'status']
})

var vm = new Vue({
    el: '#vue-app',
    data: {
        twitchResults: []
    },
    methods: {
        getStreamList: function(user) {
            var arr = [];
            $.ajax({
                type: "GET",
                dataType: "json",
                url: `https://api.twitch.tv/kraken/users/${user}/follows/channels?limit=25&sortby=last_broadcast`,
                headers: { 'Client-ID': 'kjuxb8d6m4k8sek7vqnfvr3y1694077' },
                success: (res) => {
                    var len = res.follows.length;
                    for (let i = 0; i < len; i++) {
                        this.seeWhosLive(res.follows[i].channel.name.toString());
                    }
                }                
            }).then(() => { $('#games').css({'color': '#909'}) });
        },

        seeWhosLive: function(name) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: 'https://api.twitch.tv/kraken/streams/' + name,
                headers: { 'Client-ID': 'kjuxb8d6m4k8sek7vqnfvr3y1694077' },
                error: (err) => console.log(err.message),
                success: function(res) {
                    if(res.stream) { vm.twitchResults.push(res.stream.channel); }                    
                }
            });
        }
    },
    mounted() {
        console.log('Ready!');
     	this.getStreamList('silverrain64');
    }
})