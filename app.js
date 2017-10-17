Vue.component('tw-result', {
    template: `<tr><td><img :src='logo' :alt='chan + " stream logo"'></td><td> {{ name }} </td><td class='names'><a :href='url'> {{ chan }} </a></td>
<td> {{ game }} </td> <td class='sm-hide'> <a :href='url'> {{ status }} </a></td></tr>`,
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
                url: `https://api.twitch.tv/kraken/users/${user}/follows/channels?limit=100`,
                headers: { 'Client-ID': 'kjuxb8d6m4k8sek7vqnfvr3y1694077' },
                success: (res) => {
                    var len = res.follows.length;
                    for (let i = 0; i < len; i++) {
                        this.seeWhosLive(res.follows[i].channel.name.toString());
                    }
                }                
            }).then(() => { $('#games').css({'color': '#F0F'}) });
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