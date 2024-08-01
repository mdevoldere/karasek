export class KarasekQuestion
{
    constructor(question) {
        Object.assign(this, question);
        this._score = 0;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = parseInt(value);
    }
}

export class KarasekQuiz 
{
    constructor(questions) {
        this.q = questions;
        this.autonomie = 0;
        this.utilisationCompetences = 0;
        this.autonomieDecisionnelle = 0;
        this.demandePsychologique = 0;
        this.soutienSocial = 0;
    }

    calc() {
        this.autonomie = this.getAutonomie();
        this.utilisationCompetences = this.getUtilisationCompetences();
        this.autonomieDecisionnelle = this.getAutonomieDecisionnelle();
        this.demandePsychologique = this.getDemandePsychologique();
        this.soutienSocial = this.getSoutienSocial();
        this.reconnaissance = this.getReconnaissance();
    }

    formulaireComplet() {
        if(this.q.every(x => x.score > 0)) {
            console.log(this.q)
            this.calc();
            return true;
        }
        return false;
    }

    getAutonomie() {
        // Autonomie = 4 x [Q4 + (5-Q6) + Q8]
        let q4 = this.q[3].score;
        let q6 = this.q[5].score;
        let q8 = this.q[7].score;

        return (4 * (q4 + (5-q6) + q8));
    }

    getUtilisationCompetences() {
        // Utilisation des compétences = 
        // [Q1 + (5-Q2) + Q3 + Q5 +Q7 + Q9]
        let q1 = this.q[0].score;
        let q2 = this.q[1].score;
        let q3 = this.q[2].score;
        let q5 = this.q[4].score;
        let q7 = this.q[6].score;
        let q9 = this.q[8].score;

        return (q1 + (5-q2) + q3 + q5 + q7 + q9);
    }

    getAutonomieDecisionnelle() {
        // Latitude décisionnelle = 
        // Autonomie + Utilisation des compétences
        return this.getAutonomie() + this.getUtilisationCompetences();
    }

    getDemandePsychologique() {
        // Demande psychologique = 
        // Q10 + Q11 + Q12+( 5-Q13) + Q14 + Q15 + Q16+ Q17 + Q18
        let q10 = this.q[9].score;
        let q11 = this.q[10].score;
        let q12 = this.q[11].score;
        let q13 = this.q[12].score;
        let q14 = this.q[13].score;
        let q15 = this.q[14].score;
        let q16 = this.q[15].score;
        let q17 = this.q[16].score;
        let q18 = this.q[17].score;

        return (q10 + q11 + q12 + (5 - q13) + q14 + q15 + q16 + q17 + q18);
    }

    getSoutienSocial() {
        // Soutien social = Q23 + Q24 + Q25+ Q26
        
        let q23 = this.q[22].score;
        let q24 = this.q[23].score;
        let q25 = this.q[24].score;
        let q26 = this.q[25].score;

        return (q23 + q24 + q25 + q26);
    }

    getReconnaissance() {
        // Reconnaissance = (5-Q27) + (5-Q28) + Q29 + Q30 + Q31 + Q32
        let q27 = this.q[26].score;
        let q28 = this.q[27].score;
        let q29 = this.q[28].score;
        let q30 = this.q[29].score;
        let q31 = this.q[30].score;
        let q32 = this.q[31].score;

        return ((5 - q27) + (5 - q28) + q29 + q30 + q31 + q32);
    }


}

export const ComponentQuestion = {
    props: {
        quiz: KarasekQuiz
    },
    data() {
        return {
            position: 0,
            answers: [
                { score: 1, label: "Pas du tout d'accord"},
                { score: 2, label: "Pas d'accord"},
                { score: 3, label: "D'accord"},
                { score: 4, label: "Tout à fait d'accord"}
            ]
        }
    },
    mounted() {
        
    },
    computed: {
        question() {
            return this.quiz.q[this.position] ?? null;
        }
    },
    methods: {
        validate(e) {
            this.question.score = e.target.dataset.value;
            if(this.position < this.quiz.q.length-1)
                this.position++;
        }
    },
    template: `<fieldset class="question" v-if="question !== null">
        <legend>Question {{ question.id }}/{{ quiz.q.length }}</legend>
        <label>{{ question.question }}.</label>
        <div class="answers">
            <button @click="validate" v-for="a,idx of answers" :name="question.id" :data-value="idx+1">{{ a.label }}</button>
        </div>
    </fieldset>`
}
