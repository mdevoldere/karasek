import { KarasekQuestion, KarasekQuiz, ComponentQuestion } from "./karasek.js";

const karasekApp = {
    components: { ComponentQuestion },
    data() {
        return {
            services: ['RF', 'OFP'],
            selectedService: '',
            questions: [],
            quiz: null,
            ready: false
        }
    },
    async mounted() {
        let r = await fetch('./assets/karasek.json');
        let questionsSrc = await r.json();
        for(let q of questionsSrc) {
            this.questions.push(new KarasekQuestion(q));
        }
        this.quiz = new KarasekQuiz(this.questions);
        //console.log(this.quiz);
    },
    computed: {
        hasSelectedService() {
            return this.selectedService.length > 1;
        }
    },
    methods: {
        startQuiz() {
            this.ready = true;
        },
        selectService(event) {
            //this.selectedService = event.target.
        }
    }
}

Vue.createApp(karasekApp).mount('#app');