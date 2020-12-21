import RandomizeQuestions from "./randomizequestions.js"

class CreateAQuestion {
    constructor(newQuestion, i) {
        this.question = newQuestion.results[i].question;
        this.answers = RandomizeQuestions.getRandomizedArray([
            {
                answer: newQuestion.results[i].correct_answer, isCorrect: true
            },
            {
                answer: newQuestion.results[i].incorrect_answers[0], isCorrect: false
            },
            {
                answer: newQuestion.results[i].incorrect_answers[1], isCorrect: false
            },
            {
                answer: newQuestion.results[i].incorrect_answers[2], isCorrect: false
            }
        ]);
    }
}

export default CreateAQuestion