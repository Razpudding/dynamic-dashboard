Vue.component('result-link', {
  // This component will hold the blueprint a theme link
  // It has the needed data in the props attribute
  // And the needed HTML in the template attribute.
  props: {
  	result: Object,
  },
  template: `<li class="link">{{ result.label }}</li>`,
})

Vue.component('theme-page', {
	// This component holds the blueprint for a theme page
	// Note how this component use the data function and not props
	//	Because we want to be able to change that data in the mounted function
	template: `
		<ul>
			<li v-for="result in this.results"><a :href="result.subj.value">
				{{ result.subj.value}}
			</a></li>
		</ul>`,
	data: function(){
		return {
			results: null,
		}
	},
	mounted(){
		const query = `
			PREFIX dc: <${app.prefixes.dc}>
			SELECT * WHERE {
				?subj dc:subject  <${app.currentThemeId}> .
			} LIMIT ${app.sparqlLimit}
		`
		app.fetchSparqlData(app.endpoints.nmvw, query)
			.then(json => json.results.bindings)
  			.then(results => this.results = results)
	}
})

const app = new Vue({
	el: '#app',
	data: {
		currentTheme: null,
		currentThemeId: null,
		detailPage: false,
		results: null,
		sparqlLimit: 30,
		endpoints: {
			nmvw: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-40/sparql"
		},
		prefixes: {
			dc:  'http://purl.org/dc/elements/1.1/',
			skos:'http://www.w3.org/2004/02/skos/core#'
		},
	},
	created(){
		//This query will help us get the different available themes in our dataset
		const query = `
		PREFIX dc: <${this.prefixes.dc}>
		PREFIX skos: <${this.prefixes.skos}>

		SELECT distinct ?obj ?objLabel WHERE {
		  ?subj dc:subject  ?obj .
		  ?obj skos:prefLabel ?objLabel .
		} LIMIT ${this.sparqlLimit}
		`
	//Call the fetchSparqlData method on the Vue instance
	this.fetchSparqlData(this.endpoints.nmvw, query)
  		//Extract the nested data from that json. This nesting will be different for every API btw
  		.then(json => json.results.bindings)
  		//Rewrite each result to be flat and only contain interesting values
  		.then(results => {
  			return results.map( (result, index) => {
  				return {
  					//I've added an id value because that helps Vue distinguish different items later on
  					id: index,
  					url: result.obj.value,
  					type: result.obj.type,
  					//If you're confused about this next line, try experimentig with split+pop on a string
  					// in your browser
  					themeId: result.obj.value.split(this.prefixes.nmvw).pop(),
  					label: result.objLabel.value
  				}
  			})
  		})
  		//Store the results in app.data
  		.then(results => { 
  			console.log("Cleaned api results", results)
  			this.results = results 
  		})
  	},
  	methods: {
		// Fetch some data from a url and return the results
		fetchSparqlData: async function(endpoint, query){
			console.log("fetching", endpoint, query)
			const response = await fetch(endpoint +"?query="+ encodeURIComponent(query) +"&format=json")
			//Extract the json from the html response
			const data = response.json()
			return data
		},
		setTheme(theme){
			console.log("set called with", theme)
			this.currentThemeId = theme.themeId
			this.currentTheme = theme.label
			this.detailPage = true
		}
	}
})