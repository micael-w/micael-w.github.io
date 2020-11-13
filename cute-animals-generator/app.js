/* -------------------------------------------------------------------------- */
/*                            CUTE ANIMAL GENERATOR                           */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- init ---------------------------------- */

// declare a class for the cards with all the animals

class AnimalCard {

    constructor(animalName, animalColor, animalCatchphrase) {
        this.animalName =           animalName;
        this.animalColor =          animalColor;
        this.animalCatchphrase =    animalCatchphrase;
        // we need these 2 values for the picture and for the color
        this.randomPicture =        Math.floor(Math.random()*6);
        this.randomColor =          Math.floor(Math.random()*4);
    }

    get text() {
        return `Hello! My name is ${this.animalName}, my favorite color is ${this.animalColor} and my catchphrase is ${this.animalCatchphrase}! The random picture is ${this.randomPicture} and the random color is ${this.randomColor} `;
    }

    // return our html for the card
    get listItem() {
        return `
        <li class="card cardAnimation">
                    <div class="card-top-container">
                        <div class="card-top ${this.textRandomPicture} ${this.textRandomColor}">
                        </div>
                    </div>
                    <div class="card-bottom-container ${this.textRandomColor}">
                        <div class="card-bottom">
                            <div class="card-bottom-content">
                                <h4 class="card-text card-title">Hello!</h4><p class="card-text">My name is <span class="em card-name">${this.animalName}</span> and my favorite color is <span class="em card-color">${this.animalColor}</span>!<p class="em card-text card-catchphrase-p"><span class="card-catchphrase">"${this.animalCatchphrase}"</p></p>
                            </div>
                        </div>
                    </div>
                </li>
        `
    }

    // set the random image
    get textRandomPicture() {
        return getRandomPicture(this.randomPicture);
    }

    // set the random color
    get textRandomColor() {
        return getRandomColor(this.randomColor);
    }
}


/* ----------------------------- select elements ---------------------------- */

const formName = document.querySelector(".name");
const formColor = document.querySelector(".color");
const formCatchphrase = document.querySelector(".catchphrase");
const formSubmit = document.querySelector(".btn");
const listOfCards = document.querySelector(".cards");

// this is an array of the 4 random colors assigned to each card
const arrayOfColors = ["lightsky", "turquise", "yellow", "orange"]

// this is an array of the 6 random animal pictures assigned to each card
const arrayOfAnimals = ["animal-1", "animal-2", "animal-3", "animal-4", "animal-5", "animal-6"]

/* -------------------------------- functions ------------------------------- */

function clearInputFields() {
    formName.value = "";
    formColor.value = "";
    formCatchphrase.value = "";
}

function getRandomPicture(randomPictureIndex) {
    return arrayOfAnimals[randomPictureIndex];
}

function getRandomColor(randomColorIndex) {
    return arrayOfColors[randomColorIndex];
}

/* ----------------------------- event listeners ---------------------------- */

formSubmit.addEventListener("click", function(event) {
    const addAnimal = new AnimalCard(formName.value, formColor.value, formCatchphrase.value);
    console.log(addAnimal.textRandomPicture);
    console.log(addAnimal.textRandomColor);

    let li = document.createElement("li");
    li.innerHTML = addAnimal.listItem;
    listOfCards.appendChild(li);
    console.log(li)

    clearInputFields();
});
