Vue.component('survey-answer', {
  // This component will hold th eblueprint for an answer element
  // It has the needed data in the props attribute
  // Ander the needed HTML in the template attribute.
  props: {
  	answer: Object,
  },
  template: '<li>ID: {{ answer.id }},' +
		     'Voorkeuren: {{ answer.voorkeuren }},' +
		     'Alcohol per dag: {{ answer.alcohol}}</li>'
})

const app = new Vue({
  el: '#app',
  data: {
  	message: "Hello Dashboard",
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
  }
})