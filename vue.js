var app = new Vue({
    el: "#vue-app",
    data: {

    }
})

Vue.component("content-list", {
    props: ["content-title", "content-data", "content-type"],
    template: `
        <div class="content">
            <table>
            <caption aria-hidden="false">{{props.content-title}}</caption>
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
                        <content-item></content-item>
                    </template>
                </tbody>
            </table>
        </div>
    `
})

Vue.component("content-item", {
    props: ["content-data"],
    template: `
        <tr class="row">
            <td><img :src="content-data.logo" :alt="content-data.chan + ' stream logo'"></td>
            <td>{{content-data.display_name}}</td>
            <td class="names"><a :href="url"> {{ content-data.chan }} </a>{{ content-data.game }}</td>
            <td class="sm-hide"><a :href="url"> {{ content-data.status }} </a></td>            
        </tr>
    `
})
