/* ------------- schwartzian transform of bubble sort algorithm ------------- */

class RandomizeQuestions {
    static getRandomizedArray(array) {
        let randomizedArray = array
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
        return randomizedArray;
    }
}

export default RandomizeQuestions