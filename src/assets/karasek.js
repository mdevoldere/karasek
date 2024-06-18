class KarasekQuestion
{
    constructor(question) {
        Object.assign(this, question);
        this.score = 0;
    }
}

class KarasekCalc 
{
    constructor(questions) {
        this.q = questions;
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

        return (q10 + q11 + q12 + (5 - q13) + q14 + q15 + Q16 + q17 + q18);
    }

    getSoutienSocial() {
        // Soutien social = Q23 + Q24 + Q25+ Q26
        
        let q23 = this.q[22].score;
        let q24 = this.q[23].score;
        let q25 = this.[q24].score;
        let q26 = this.q[25].score;

        return (q23 + q24 + q25 + q26);
    }


}

export { KarasekQuestion, KarasekCalc }
