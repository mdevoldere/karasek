import { KarasekQuestion, KarasekQuiz } from "./karasek.js";

const karasekApp = {
    data() {
        return {
            services: ['RF', 'OFP'],
            answersLabels: [
                { score: 1, label: "Pas du tout d'accord"},
                { score: 2, label: "Pas d'accord"},
                { score: 3, label: "D'accord"},
                { score: 4, label: "Tout à fait d'accord"}
            ],
            selectedService: '',
            questionsSrc: [],
            questions: [],
            quiz: null
        }
    },
    async mounted() {
        let r = await fetch('./assets/karasek.json');
        this.questionsSrc = await r.json();
        for(let q of this.questionsSrc) {
            this.questions.push(new KarasekQuestion(q));
        }
        this.quiz = new KarasekQuiz(this.questions);
        console.log(this.quiz);
    },
    computed: {
        hasSelectedService() {
            return this.selectedService.length > 1;
        }
    },
    methods: {
        check() {
            this.quiz.calc();
        },
        selectService(event) {
            //this.selectedService = event.target.
        }
    }
}

Vue.createApp(karasekApp).mount('#app');