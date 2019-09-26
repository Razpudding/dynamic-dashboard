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