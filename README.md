# Now Playing: an entertainment aggregator
https://now-playing-64.heroku.com

1. About
2. Objective
3. Tools and Technologies
4. Next steps

## About the project

UPDATE 10 April 2018: I took some time off from this Vue-based project to work on learning React. However, I have decided to move on entirely and leave this project unfinished for two reasons.

The first issue is that several of the services I intended to utilize have been making headlines for privacy failures and problems with curating and monetizing their content. As more and more information comes out about these issues, I find I have less and less enthusiasm for building a project that relies on those services. The second reason is that [this has already been done much, much better.](https://reelgood.com/)

### What I learned
* Vue view (heh) with multiple pages
* Express server with middleware and several defined routes
* Server-side REST API queries with various authentication methods
* Concealing keys with environment variables
* Resolving promises (however awkwardly)
* Multi-step Gulp build including Babel, minification, and image and CSS processing

.....
This project was inspired by the [freeCodeCamp](https://freecodecamp.com) API projects, which require learners to query various public APIs (e.g., Twitch.tv, Wikipedia) and display the results on HTML pages. Completing those projects was exciting, but also frustrating because of the limitations of client-side queries. Now that I'm better equipped to work with the concept, I'm upgrading my project to something more useful.

## Main Objectives - completed

* The user can visit a single app/page/dashboard, log in/out to multiple entertainment accounts, and see what new content is available. 
* The information will initially be indicated with color-changing, numbered icons; tapping or clicking an icon will bring up a list of available content.
* The user can select an item on the list and go to that site or app to view the content.

### Wish list
* (?) The user can clear all notifications or request an update.
* (?) The app will check for new info on startup and every hour it's active.
* (?) For social apps, the user will receive push notifications about friends' activity.

## Tools and technologies
* **Vue and Express** (and also some jQuery left over from a previous version of the project.)
* **Social media and entertainment services.** YouTube, Twitch.tv, and Steam. Also considering various social media options.
* **Gulp.** Yes, it would have been smarter to start out using Vue-CLI and Vuex. I tried to incorporate them partway through the project, but I found that instead of using the right tools for the project, I was trying too hard to make the project fit the tools. So, maybe next time.

### HARD MODE: Create out-of-browser experiences.
 * (?) Convert to desktop app with Electron
 * (?) Convert to phone app with Cordova
 * (?) Research service workers, progressive web apps, or whatever it is that causes notifications on smartphones and in Windows 10.

## Next steps
* ~~Rewrite previous project's view as Vue components~~
* ~~Rewrite previous project's GET/POST code~~
* ~~Figure out how to handle asynchronous updating with Vue~~
* ~~Get a working page going with two services~~
* ~~Set up OAuth and modify GETs so any user can access their stuff~~ authorization isn't always required for read access.
* ~~Research and add social media info
* ~~Consider making combined displays, e.g., streams from all sources, online friends from all sources
* ~~When all features work on Heroku, start on Electron app