Vue.component("content-result", {
    template:  `<tr class="row">
                <td></td><img :src="logo" :alt="chan + ' stream logo'"></td>
                <td><span> {{ name }} </span></td>
                <td><span class="names"><a :href="url"> {{ chan }} </a></span></td>
                <td><span> {{ game }} </span> </td>
                <td><span class="sm-hide"> <a :href="url"> {{ status }} </a></span></td>
                </tr>`,
    props: ["name", "logo", "chan", "url", "game", "status"]
})

Vue.component("content-list", {
    props: ["content-title", "content-data", "content-type"],
    template: `
        <div class="content">
            <table>
            <caption aria-hidden="false">{{content-title}}</caption>
                <thead>
                    <tr>
                        <th scope="col">Channel</th>
                        <th scope="col">Name</th>
                        <th scope="col">{{props.content-type}}</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="each in content-data">
                        <content-result></content-result>
                    </template>
                </tbody>
            </table>
        </div>
    `
})

var vm = new Vue({
    el: "#vue-app",
    data: {
        contentResults: []
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
