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


/* ----------------------------- SELECT ELEMENTS ---------------------------- */

const wrapper = document.querySelector(".wrapper");
const formName = document.querySelector(".name");
const formColor = document.querySelector(".color");
const formCatchphrase = document.querySelector(".catchphrase");
const formSubmit = document.querySelector(".btn");
const bar = document.querySelector(".progress-bar");
const listOfCards = document.querySelector(".cards");

// this is an array of the 4 random colors assigned to each card using
const arrayOfColors = ["lightsky", "turquise", "yellow", "orange"]

// this is an array of the 6 random animal pictures assigned to each card using
const arrayOfAnimals = ["animal-1", "animal-2", "animal-3", "animal-4", "animal-5", "animal-6"]

/* -------------------------------- FUNCTIONS ------------------------------- */

/* ---------------------- animate the fake progress bar --------------------- */

const i = 0;
function animateProgressBar() {
    if (i == 0) {
        bar.parentElement.style.display = "flex";
        let i = 1;
        let width = 1;
        let id = setInterval(frame, 5);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                bar.parentElement.style.display = "none";
            } else {
                width++;
                bar.style.width = width + "%";
                console.log(width)
            }
        }
    }
}

/* ------------------ clear input when a card is generated ------------------ */

function clearInputFields() {
    formName.value = "";
    formColor.value = "";
    formCatchphrase.value = "";
}

/* ---------------------- get random picture and color ---------------------- */

function getRandomPicture(randomPictureIndex) {
    return arrayOfAnimals[randomPictureIndex];
}

function getRandomColor(randomColorIndex) {
    return arrayOfColors[randomColorIndex];
}

/* ----------------------------- EVENT LISTENERS ---------------------------- */

/* ------------------------- click to add a new card ------------------------ */

formSubmit.addEventListener("click", function(event) {
    animateProgressBar();

    setTimeout(function(){
        const addAnimal = new AnimalCard(formName.value, formColor.value, formCatchphrase.value);
        console.log(addAnimal.textRandomPicture);
        console.log(addAnimal.textRandomColor);

        let li = document.createElement("li");
        li.innerHTML = addAnimal.listItem;
        li.classList.add("card", "cardAnimation");
        listOfCards.appendChild(li);
    /*     console.log(li) */

        clearInputFields();
    }, 500);
});

/* ------------------ enable button if inputs are not empty ----------------- */

wrapper.addEventListener("keyup", function(event) {
    console.log("hey");
    if ((formName.value && formColor.value && formCatchphrase.value)) {
        console.log("YES");
        formSubmit.disabled = false;
    }
});

/* ----------------- disable button again when it's clicked ----------------- */

/* --- ideally this would be an else if in the previous event listener but -- */
/* --------- unfortunately I don't know which event listener to use --------- */

formSubmit.addEventListener("click", function(evennt) {
    formSubmit.disabled = true;
});

/* window.addEventListener("DOMContentLoaded", (event) => {
    animateProgressBar();
    console.log("domcontentloaded")
}); */