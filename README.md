# dynamic-dashboard
An example of how to use a framework to dynamically generate components from data.

I've used this repo to go through various steps you might take when creating an app with SPARQL data. The app has gone through different variations that are outlined in the steps below.

If you want so see a live view of the app, click on the Github Pages example in the repo description. If you want to edit the code in a WYSIWYG check out [this vizhub demo](https://beta.vizhub.com/Razpudding/dcffa6b746ac4d1c8207aab5497ae57c)(I can't promise it will be up-to-date with the latest changes).

## Concept
I want to show students how to use a front-end framework to dynamically generate components from a data source. One useful example would be to create visualizations from a data source.
I'll try to set out a simple example of how to do that here. If time permits, it will include soms d3 visualizations, if not, just a component generation pattern.
I've chosen not to use any build tools so as to try to limit the overhead and environment software needed to understand this project. Let's see how that goes.

## Functionality
- Data is loaded in a vue method from a SPARQL endpoint
- The stored data is used to render a list of themes available in the data
- Each theme links to a detailpage which loads example works of that theme
- The whole thing functions without routing but instead uses conditional content loading.

## Steps
You can follow along with the progress by checking these commits in order. I'll build up the application in clear steps.
If there's no link yet for a step that means I haven't built it yet. Feel free to send pull requests for those ;)
* [Basic Vue setup](https://github.com/Razpudding/dynamic-dashboard/commit/ff6228865af1291be026341dbdbe260ed0ffddb7)
* [Dynamically creating a list from data](https://github.com/Razpudding/dynamic-dashboard/commit/efcccbe4eb6b1b7af1bc87e4771c6e2aefc18573)
* [Creating a Vue component](https://github.com/Razpudding/dynamic-dashboard/commit/1e62c3d470bf7e4f1d344c1c0690a02e9aed9802)
* [Setting up routing to different pages](https://github.com/Razpudding/dynamic-dashboard/commit/ae56ae5a6662dced2646d8f627244ee618d498b8)
* [Creating a d3 visualization](https://github.com/Razpudding/dynamic-dashboard/commit/b1949e264b36605d3236de7a492f4f9ae7a8b7ad)
* [Fetching a local data file](https://github.com/Razpudding/dynamic-dashboard/commit/88056dc7df903c8002a46c5bef021ff863beb63d) **Read commit notes!**
* [Fetching remote data](https://github.com/Razpudding/dynamic-dashboard/commit/df253364ba9b9c77eef6e34c975b3c8b6077e0d5)
* [Passing relevant data to each component](https://github.com/Razpudding/dynamic-dashboard/commit/4aa1d67eeb73d788e98505148b009b35c1a1bc1c)
* [Have components request their own data](https://github.com/Razpudding/dynamic-dashboard/commit/cb7c8a66f867d3e6a1383d11a8c1eb9dacd4ed95)
* [Refactor the hash-router into the proposed solution above](https://github.com/Razpudding/dynamic-dashboard/commit/c65fbbd23ad21869aa10182548d4d59135d0da68)
* Show something useful instead of a list of links (basic d3 vis would be nice)
* Load different data after user interaction

## Credits
A lot of the work here has been adapted from [Vue's excellent starters guide](https://vuejs.org/v2/guide)