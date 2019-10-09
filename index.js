Vue.component('result-link', {
  // This component will hold the blueprint a theme link
  // It has the needed data in the props attribute
  // And the needed HTML in the template attribute.
  // Having some trouble initializing a component when someone clicks on this link
  //  Might be able to use this: https://stackoverflow.com/questions/40905292/vue-js-2-how-to-initializeconstruct-a-vue-component-from-a-vue-file
  //  Or if possible: this
  props: {
  	result: Object,
  },
  template: `<li><a :href="'#theme-'+result.theme">Thema: {{ result.theme }}</a></li>`,
})

Vue.component('theme-page', {
	template: `<svg width="960" height="500"></svg>`,
	data(){
		return {
			theme: null
		}
	},
	mounted(){
		//Set the theme depending on the hash
		this.theme = window.location.hash.split("-").pop()
		const query = `
			PREFIX dct: <${app.prefixes.dct}>
			PREFIX gvn: <${app.prefixes.gvn}>
			PREFIX xml: <${app.prefixes.xml}>
			SELECT * WHERE {
				?subj xml:theme  gvn:${this.theme} .
			} LIMIT 100
		`
		app.fetchSparqlData(app.endpoints.gvn, query)
			.then(json => json.results.bindings)
  			.then(results => {
  				const svg = d3.select('svg');
			    svg.selectAll("text")
					.data(results)
					.enter().append("text")
					.text(d => d.subj.value)
					.attr('y', (d, i) => { return i * 40 + 40})
		})
	}
})

const app = new Vue({
	el: '#app',
	data: {
		currentRoute: window.location.pathname,
		message: "Hello Dashboard",
		detailPage: false,
		results: null,
		endpoints: {
			gvn: "https://api.data.netwerkdigitaalerfgoed.nl/datasets/hackalod/GVN/services/GVN/sparql"
		},
		prefixes: {
			gvn: 'https://data.netwerkdigitaalerfgoed.nl/hackalod/gvn/',
			xml: 'http://xmlns.com/foaf/0.1/',
			dct: 'http://purl.org/dc/terms/',
		},
	},
	created(){
		window.addEventListener("hashchange", ()=>{
			if(window.location.hash.includes("#theme-")){
				this.detailPage = true
			} else {
				this.detailPage = false
			}
		})
		//This query will help us get the different available themes in our dataset
		const query = `
		PREFIX gvn: <${this.prefixes.gvn}>
		PREFIX xml: <${this.prefixes.xml}>

		SELECT distinct ?obj WHERE {
			?subj xml:theme  ?obj .
		} LIMIT 1000
		`
	//Call the fetchSparqlData method on the Vue instance
	this.fetchSparqlData(this.endpoints.gvn, query)
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
  					theme: result.obj.value.split(this.prefixes.gvn).pop()
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
		}
	}
})