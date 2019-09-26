# dynamic-dashboard
An example of how to use a framework to dynamically generate components from data


## Concept
I want to show students how to use a front-end framework to dynamically generate components from a data source. One useful example would be to create visualizations from a data source.
I'll try to set out a simple example of how to do that here. If time permits, it will include soms d3 visualizations, if not, just a component generation pattern.
I've chosen not to use any build tools so as to try to limit the overhead and environment software needed to understand this project. Let's see how that goes.

## Outline
- A json file is loaded with some data
- Vue is used to generate components using that data
- Different views are created of the data (each on their own page)
- The different views are presented using a d3 datavisualization