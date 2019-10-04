Vue.component('survey-answer', {
  // This component will hold the blueprint for an answer element
  // It has the needed data in the props attribute
  // And the needed HTML in the template attribute.
  // Note how the template string is quite ugly and could use refactoring
  props: {
  	answer: Object,
  },
  template: `<li><a :href="'#'+answer.id">ID: {{ answer.id }}</a>,
		     Voorkeuren: {{ answer.voorkeuren }},
		     Alcohol per dag: {{ answer.alcohol}}</li>`
})

Vue.component('data-visualization', {
	template: `<p>filler</p>`
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
  		console.log(window.location.hash)
  	})
  }
})