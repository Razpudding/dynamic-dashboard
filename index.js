Vue.component('survey-answer', {
  // This component will hold the blueprint for an answer element
  // It has the needed data in the props attribute
  // And the needed HTML in the template attribute.
  // Note how the template string is quite ugly and could use refactoring
  props: {
  	answer: Object,
  },
  template: `<li><a :href="'#data-visualization'+answer.id">ID: {{ answer.id }}</a>,
		     Voorkeuren: {{ answer.voorkeuren }},
		     Alcohol per dag: {{ answer.alcohol}}</li>`
})

Vue.component('data-visualization', {
	template: `<svg width="960" height="500"></svg>`,
	mounted(){
		//TODO: Maybe don't use svg if we're just adding text elements
		const svg = d3.select('svg');
		const endpoint =
		  'https://api.data.netwerkdigitaalerfgoed.nl/datasets/hackalod/GVN/services/GVN/sparql';
		const query = `
		PREFIX dct: <http://purl.org/dc/terms/>

		SELECT * WHERE {
		  ?sub dct:created "1893" .
		} LIMIT 1000
		`;

		loadData(endpoint, query)

		function loadData(url, query){
		  d3.json(url + '?query=' + encodeURIComponent(query) + '&format=json').then(data => {
		    console.log(data)
		    svg.selectAll("text")
				.data(data.results.bindings)
				.enter().append("text")
				.text(d => d.sub.value)
				.attr('y', (d, i) => { return i * 40 + 40})
		  })
		}
	}
})

const app = new Vue({
  el: '#app',
  data: {
  	currentRoute: window.location.pathname,
  	message: "Hello Dashboard",
  	detailPage: false,
    answers: [
    {
        "voorkeuren": "Frontend",
        "alcohol": "4",
        "id": 0
    },
    {
        "voorkeuren": "Frontend, Interaction Design, UX",
        "alcohol": "5",
        "id": 1
    },
    {
        "voorkeuren": "Visual Design, Interaction Design, UX, Design Research",
        "alcohol": "0",
        "id": 2
    },
    {
        "voorkeuren": "Visual Design, Frontend",
        "alcohol": "1",
        "id": 3
    }
   	]
  },
  created(){
  	window.addEventListener("hashchange", ()=>{
  		if(window.location.hash.includes("data-visualization")){
  			this.detailPage = true
  		} else {
  			this.detailPage = false
  		}
  	})
  }
})