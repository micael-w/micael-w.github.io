/* -------------------------------------------------------------------------- */
/*                            CUTE ANIMAL GENERATOR                           */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- init ---------------------------------- */

// declare a class for the cards with all the animals

class AnimalCard {
    constructor(animalName, animalColor, animalCatchphrase) {
        this.animalName = animalName;
        this.animalColor = animalColor;
        this.animalCatchphrase = animalCatchphrase;
        // we need these 2 values for the picture and for the color
        this.randomPicture = Math.floor(Math.random()*7);
        this.randomColor = Math.floor(Math.random()*3);
    }

    get text() {
        return `Hello! My name is ${this.animalName}, my favorite color is ${this.animalColor} and my catchprhase is ${this.animalCatchphrase}! The random picture is ${this.randomPicture} and the random color is ${this.randomColor} `;
    }

    get listItem() {
        return `
        <li class="card cardAnimation">
                    <div class="card-top-container">
                        <div class="card-top">
                        </div>
                    </div>
                    <div class="card-bottom-container">
                        <div class="card-bottom">
                            <div class="card-bottom-content">
                                <h4 class="card-text card-title">Hello!</h4><p class="card-text">My name is <span class="em card-name">${this.animalName}</span> and my favorite color is <span class="em card-color">${this.animalColor}</span>!<p class="em card-text card-catchphrase-p"><span class="card-catchphrase">"${this.animalCatchphrase}"</p></p>
                            </div>
                        </div>
                    </div>
                </li>
        `
    }
}


/* ----------------------------- select elements ---------------------------- */

const formName = document.querySelector(".name");
const formColor = document.querySelector(".color");
const formCatchphrase = document.querySelector(".catchphrase");

const formSubmit = document.querySelector(".btn");

const listOfCards = document.querySelector(".cards");

/* -------------------------------- functions ------------------------------- */

function clearInputFields(){
    formName.value = "";
    formColor.value = "";
    formCatchphrase.value = "";
}

formSubmit.addEventListener("click", function(event) {
    const addAnimal = new AnimalCard(formName.value, formColor.value, formCatchphrase.value);
    console.log(addAnimal.text)

    listOfCards.innerHTML += addAnimal.listItem;



    clearInputFields();
});

