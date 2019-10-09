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
  template: `<li><a :href="'#'+result.theme">Thema: {{ result.theme }}</a></li>`,
})

const app = new Vue({
  el: '#app',
  data: {
  	currentRoute: window.location.pathname,
  	message: "Hello Dashboard",
  	detailPage: false,
    results: null,
  },
  created(){
  	window.addEventListener("hashchange", ()=>{
  		if(window.location.hash.includes("data-visualization")){
  			this.detailPage = true
  		} else {
  			this.detailPage = false
  		}
  	})
	const endpoint =
	  'https://api.data.netwerkdigitaalerfgoed.nl/datasets/hackalod/GVN/services/GVN/sparql';
	const prefixGVN = 'https://data.netwerkdigitaalerfgoed.nl/hackalod/gvn/'
	const query = `
		PREFIX gvn: <${prefixGVN}>
		PREFIX xml: <http://xmlns.com/foaf/0.1/>

		SELECT distinct ?obj WHERE {
	 	 ?subj xml:theme  ?obj .
		} LIMIT 1000
	`

  	fetch(endpoint +"?query="+ encodeURIComponent(query) +"&format=json")
  		//Extract the json from the html response
  		.then(data => data.json())
  		//Extract the nested data from that json. This nesting will be different for every API btw
  		.then(json => json.results.bindings)
  		//Rewrite each result to be flat and only contain interesting values
  		.then(results => {
  			console.log(results)
  			return results.map( (result, index) => {
  				return {
  					//I've added an id value because that helps Vue distinguish different items later on
  					id: index,
  					url: result.obj.value,
  					type: result.obj.type,
  					//If you're confused about this next line, try experimentig with split+pop on a string
  					// in your browser
  					theme: result.obj.value.split(prefixGVN).pop()
  				}
  			})
  		})
  		//Store the results in app.data
  		.then(results => { 
  			console.log("Cleaned api results", results)
  			this.results = results 
  		})
	}
})