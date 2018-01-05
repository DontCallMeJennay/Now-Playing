Vue.component("control-panel", {
    props: {
        getName: Function,
        user: String
    },
    data: function() {
        return {
            signedIn: false
        }
    },    
    template: `
        <section>
            <div>
                <label for="username">Enter Twitch.tv username</label>
                <input type="text" v-model=user id="username"/>
                <button class="btn-filter" id="twitch-auth" @click=getName()>Get follow list</button></button>
            </div>
            <div>
                <button class="btn-filter" id="authorize-button" style="display: block;">Authorize Y</button>
                <button class="btn-filter" id="signout-button" style="display: block;">Sign out of YouTube</button>
            </div>
        </section>`
})
