# dynamic-dashboard
An example of how to use a framework to dynamically generate components from data

## Concept
I want to show students how to use a front-end framework to dynamically generate components from a data source. One useful example would be to create visualizations from a data source.
I'll try to set out a simple example of how to do that here. If time permits, it will include soms d3 visualizations, if not, just a component generation pattern.
I've chosen not to use any build tools so as to try to limit the overhead and environment software needed to understand this project. Let's see how that goes.

- It's not possible to use single-file Vue components without a proper build environment like node. This forces you to write html in js... Yes I know about template strings and no, I don't think they're a real substitute. 
- I'm using a # router to enable a SPA-like experience. Proper routing would be nice but it would mean loading different html files which is annoying without node packages.
- It might be a good idea to keep this to a Vue+ Loading data example and leave more complex datavisualizations for a separate example. The app could work like this
    + Load some data in a vue method(for instance from a SPARQL endpoint as my students will be using that)
    + Show different aspects of that data on different detail pages.
    + Have a detailpage for each data entry
    + Have some overviewpages showing different aspects (like images, year created etc)

## Outline
- A json file is loaded with some data
- Vue is used to generate components using that data
- Different views are created of the data (each on their own page)
- The different views are presented using a d3 datavisualization

## Steps
You can follow along with the progress by checking these commits in order. I'll build up the application in clear steps.
If there's no link yet for a step that means I haven't built it yet. Feel free to send pull requests for those ;)
* [Basic Vue setup](https://github.com/Razpudding/dynamic-dashboard/commit/ff6228865af1291be026341dbdbe260ed0ffddb7)
* [Dynamically creating a list from data](https://github.com/Razpudding/dynamic-dashboard/commit/efcccbe4eb6b1b7af1bc87e4771c6e2aefc18573)
* [Creating a Vue component](https://github.com/Razpudding/dynamic-dashboard/commit/1e62c3d470bf7e4f1d344c1c0690a02e9aed9802)
* Setting up routing to different pages
* Creating a d3 visualization
* Loading the data once in a central vue method
* Passing relevant data to each component
* Refactoring: Moving routes to a router module

## Credits
A lot of the work here has been adapted from [Vue's excellent starters guide](https://vuejs.org/v2/guide)