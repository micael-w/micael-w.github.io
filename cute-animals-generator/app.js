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

    // set the random images and colors
    get textRandomPicture() {
        return getRandomPicture(this.randomPicture);
    }

    get textRandomColor() {
        return getRandomColor(this.randomColor);
    }
}

/* ----------------------------- SELECT ELEMENTS ---------------------------- */
/* ----------------------------- SELECT ELEMENTS ---------------------------- */
/* ----------------------------- SELECT ELEMENTS ---------------------------- */

const formInput = document.querySelectorAll(".text");
const wrapper = document.querySelector(".wrapper");
const formName = document.querySelector(".name");
const formColor = document.querySelector(".color");
const formCatchphrase = document.querySelector(".catchphrase");
const formSubmit = document.querySelector(".btn");
const bar = document.querySelector(".progress-bar");
const listOfCards = document.querySelector(".cards");

// this is an array of the 4 random colors assigned to each card
const arrayOfColors = ["lightsky", "turquise", "yellow", "orange"]

// this is an array of the 6 random animal pictures assigned to each card
const arrayOfAnimals = ["animal-1", "animal-2", "animal-3", "animal-4", "animal-5", "animal-6"]

/* -------------------------------- FUNCTIONS ------------------------------- */
/* -------------------------------- FUNCTIONS ------------------------------- */
/* -------------------------------- FUNCTIONS ------------------------------- */

/* ---------------------- animate the fake progress bar --------------------- */


function animateProgressBar() {
    const i = 0;
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

// preload images for cards and add to <head> element
function preloadImages(){
    for (let i = 0; i < arrayOfAnimals.length; i++){
        let preloadLink = document.createElement("link");
        preloadLink.href = `./img/${i+1}.PNG`;
        preloadLink.rel = "preload";
        preloadLink.as = "image";
        document.head.appendChild(preloadLink);
    }
}

function clearInputIcons() {
    for (let i = 0; formInput.length > i; i++) {
        formInput[i].classList.remove("checked");
        formInput[i].classList.remove("unchecked");
    }
}

/* ----------------------------- EVENT LISTENERS ---------------------------- */
/* ----------------------------- EVENT LISTENERS ---------------------------- */
/* ----------------------------- EVENT LISTENERS ---------------------------- */

/* ------------------ preload images when onload ---------------------------- */

document.addEventListener("onload", preloadImages());

/* ------------------------- click to add a new card ------------------------ */

formSubmit.addEventListener("click", function(event) {
    animateProgressBar();

    //make new card after delay
    setTimeout(() => {
        const addAnimal = new AnimalCard(formName.value, formColor.value, formCatchphrase.value);
        let li = document.createElement("li");
        li.innerHTML = addAnimal.listItem;
        li.classList.add("card", "cardAnimation");
        listOfCards.appendChild(li);

        clearInputFields();
        clearInputIcons();
    }, 500);
});

/* ------------------ enable button if inputs are not empty ----------------- */

wrapper.addEventListener("keyup", function(event) {
    if ((formName.value && formColor.value && formCatchphrase.value)) {
        formSubmit.disabled = false;
    }
});

/* ----------------- disable button again when it's clicked ----------------- */

/* --- ideally this would be an else if in the previous event listener but -- */
/* --------- unfortunately I don't know which event listener to use --------- */

formSubmit.addEventListener("click", function(event) {
    formSubmit.disabled = true;
});

/* ------------------- indicate text input status on blur ------------------- */

formName.addEventListener("blur", function(event){
    if (formName.value) {
        formName.classList.add("checked");
        formName.classList.remove("unchecked");
    } else {
        formName.classList.add("unchecked")
        formName.classList.remove("checked")
    }
});

formColor.addEventListener("blur", function(event){
    if (formColor.value) {
        formColor.classList.add("checked");
        formColor.classList.remove("unchecked");
    } else {
        formColor.classList.add("unchecked")
        formColor.classList.remove("checked")
    }
});

formCatchphrase.addEventListener("blur", function(event){
    if (formCatchphrase.value) {
        formCatchphrase.classList.add("checked");
        formCatchphrase.classList.remove("unchecked");
    } else {
        formCatchphrase.classList.add("unchecked")
        formCatchphrase.classList.remove("checked")
    }
});