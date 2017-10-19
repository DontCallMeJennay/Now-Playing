Vue.component("tw-result", {
    template:  `<div class="row">
                <img :src="logo" :alt="chan + ' stream logo'">
                <span> {{ name }} </span>
                <span class="names"><a :href="url"> {{ chan }} </a></span>
                <span> {{ game }} </span> 
                <span class="sm-hide"> <a :href="url"> {{ status }} </a></span>
                </div>`,
    props: ["name", "logo", "chan", "url", "game", "status"]
})

Vue.component("yt-result", {
    template:  `<div class="row">
                <img :src="logo" :alt="chan + ' stream logo'">
                <span> {{ name }} </span>
                <span class='names'><a :href='url'> {{ chan }} </a></span>
                <span> {{ game }} </span> 
                <span class='sm-hide'> <a :href='url'> {{ status }} </a></span>
                </div>`,
    props: ["name", "id", "count", "descr", "icon"]
})

var vm = new Vue({
    el: "#vue-app",
    data: {
        twitchResults: [],
        ytResults: []
    },
    methods: {
        getStreamList: function(user) {
          console.log("getStreamList() fired");
            $.get("/streams", (data) => {
              this.twitchResults = data;
              //seeWhosLive(data);
            }).then(() => {               
              console.log('twitchResults: ', this.twitchResults);
              $('#games').css({'color': '#909'}) 
            });
        },

        seeWhosLive: function(name) {            
        
        }
    },
    mounted() {
        console.log('Ready!');
        console.log('twitchResults: ', this.twitchResults);
      //this.getStreamList();
    }
})

$("document").ready(function() {

    $("#tList, #yList").hide();

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
