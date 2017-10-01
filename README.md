# Now Playing: an entertainment aggregator
1. About
2. Objective
3. Tools and Technologies
4. Next steps

## About the project

This project was inspired by the [freeCodeCamp](https://freecodecamp.com) API projects, which require learners to query various public APIs (e.g., Twitch.tv, Wikipedia) and display the results on HTML pages. Completing those projects was exciting, but also frustrating because of the limitations of client-side queries. Now that I'm better equipped to work with the concept, I'm upgrading my project to something more useful.

## Objectives

* The user can visit a single app/page/dashboard, log in to multiple entertainment accounts, and see what new content is available. 
* The information will initially be indicated with color-changing, numbered icons; tapping or clicking an icon will bring up a list of available content.
* The user can select an item on the list and go to that site or app to view the content.

* Wish list
 * (?) The user can clear all notifications or request an update.
 * (?) The app will check for new info on startup and every hour it's active.
 * (?) For social apps, the user will receive push notifications about friends' activity.

## Tools and technologies
* **MEVN stack, minus the M.**
* **My previous project.** jQuery may be ugly, but the code does work.
* **Social media and entertainment services.** YouTube, Twitch.tv, and Twitter have well-documented APIs and OAuth support, so they are logical starting points. Also investigating Steam, Netflix, Facebook, and HBO Go.
* **OAuth and/or OpenID.** Some (most?) of the services have built-in authentication support, so why reinvent the wheel?
* **HTTPS hosting.** Or does that go without saying?
* **HARD MODE: Create out-of-browser experiences.**
 * (?) Convert to desktop app with Electron
 * (?) Convert to phone app with Cordova
 * (?) Research service workers, progressive web apps, or whatever it is that causes notifications on smartphones and in Windows 10.

## Next steps
* Rewrite previous project's view as Vue components
* Rewrite previous project's AJAX code into Express
* Figure out how to handle asynchronous updating with Vue. Vuex?
* Get a working product going with two services
* Research and add 1-3 more services