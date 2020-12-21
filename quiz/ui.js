class UI {

    static async paintUI(array, i, userScore, correctAnswers) {
        let wrapper = document.querySelector(".wrapper");
        const output = [];

        if (i < array.length) {

            output.push(`
            <div class="container">
                <div class="question">
                    <h1>${array[i].question}</h1>
                </div>
                <div class="question-number">
                    <p>This is question ${i+1} of ${array.length}</p>
                </div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${((i+1)*100)/array.length}%">              
                    </div>
                </div>
                `);

                for (let index = 0; index < array[i].answers.length; index++) {
                    output.push(`
                    <div class="btn option option-${index+1}">
                        ${array[i].answers[index].answer}
                    </div>
                    `);
                }
                
                output.push(`
                <div class="navigation">
                    <div class="btn nav-btn next next-disabled">
                        Next
                    </div>
                    <div class="btn nav-btn restart">
                        Restart
                    </div>
                </div>
            </div>
                `);

                wrapper.innerHTML = output.join('\n');

        } else {

            output.push(`
            <div class="results">
                <div class="score">
                    You scored ${correctAnswers} of ${array.length}!
                </div>
                `);

                let whichQuestion = 0;
                output.push(
                    array.forEach((elem, i) => {
                        whichQuestion++
                        output.push(`
                        <div class="qu qu-${i+1}">
                            ${elem.question}
                        </div>
                        `);
                        elem.answers.forEach((elem, i) => {
                            output.push(`
                            <div class="qu-${whichQuestion}-op-${i+1} op">
                                ${elem.answer}
                            </div>
                            `);
                        });
                    }));

                    output.push(`
                    <div class="navigation">
                        <div class="btn nav-btn nav-btn-full restart">
                            Restart
                        </div>
                    </div>
                    `);

            wrapper.innerHTML = output.join('\n');
            console.log(userScore)

            for (let i = 1; i < userScore.length+1; i++) {
               document.querySelector(`.qu-${userScore[i-1].currentQuestion}-op-${userScore[i-1].correctAnswer}`).className += " op-correct"
               document.querySelector(`.qu-${userScore[i-1].currentQuestion}-op-${userScore[i-1].userAnswer}`).className += " op-selected"       
            }
        }
              
    }

}

export default UI