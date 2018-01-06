Vue.component("youtube-list", {
    props: {
        contentTitle: String,
        contentData: Array,
        contentType: String,
        view: {
            type: String,
            required: true
        }
    },
    methods: {
        snip: function (string) {
            if (string.length > 100) { return string.substr(0, 200) + "..."; }
            else { return string; }
        }
    },
    template: `
        <div class="content" v-show="view==='youtube'">
            <div class="line">     
            <button class="ybtn" id="authorize-button" style="display: block;">Log in to your YouTube account</button>
            <button class="ybtn" id="signout-button" style="display: block;">Sign out of YouTube</button>
            </div>
            <table class="red" id="ytable">
                <caption class="hidden" aria-hidden="false">{{contentTitle}}</caption>
                <thead v-if="this.contentData.length > 0">
                    <tr>
                        <th scope="col">Channel</th>
                        <th scope="col">Name</th>
                        <th scope="col" class="sm-hide">Description</th>
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
                                :url="item.snippet.resourceId.channelId"                                                       
                            ></youtube-result> 
                        </template>
                </template>            
                </tbody>
            </table>
            <p v-if="contentData.length < 1"> No new content was found. <a href="https://www.youtube.com">Go to site</a></p>
        </div>
            `
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
                <td><span class="names"><a :href="'https://youtube.com/channel/' + url + '/videos'"> {{ name }} </a></span></td>
                <td class="sm-hide"><span> <a :href="'https://youtube.com/channel/' + url + '/videos'"> {{ desc }} </a></span></td>
                </tr>`,
})