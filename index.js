Vue.component('result-link', {
  // This component will hold the blueprint for an answer element
  // It has the needed data in the props attribute
  // And the needed HTML in the template attribute.
  // Note how the template string is quite ugly and could use refactoring
  props: {
  	result: Object,
  },
  template: `<li><a :href="'#data-visualization'+result.value">Link: {{ result.value }}</a></li>`
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
	const query = `
	PREFIX dct: <http://purl.org/dc/terms/>

	SELECT * WHERE {
	  ?sub dct:created "1893" .
	} LIMIT 1000
	`;

  	fetch(endpoint +"?query="+ encodeURIComponent(query) +"&format=json")
  		//Extract the json from the html response
  		.then(data => data.json())
  		//Extract the nested data from that json
  		.then(json => json.results.bindings)
  		//Rewrite each result to be flat and only contain interesting values
  		.then(results => {
  			return results.map( (result, index) => {
  				return {
  					//I've added an id value because that helps Vue distinguish different items later on
  					id: index,
  					value: result.sub.value,
  					type: result.sub.type
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