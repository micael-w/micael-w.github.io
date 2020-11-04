/* ----------------------------- select elements ---------------------------- */

const title = document.querySelector(".title");
const description = document.querySelector(".description");
const button = document.querySelector(".submit");

/* -------------------------- set global variables -------------------------- */

/* this is an array to hold our objects */
const listOfItems = [];


/* -------------------------------- functions ------------------------------- */

/* this function creates a new object                           */
/* it takes 2 attributes from title and description inputs      */

function createNewObject(title, description){

    /* create a new object and assign it values */
    const newObject = {
        objectTitle:            title,
        objectDescription:      description
    }

    /* push the object into the array */
    listOfItems.push(newObject);

    /* add the array to localStorage */
    localStorage.setItem("localStorageItems", JSON.stringify(listOfItems));

    /* console log the first object from localStorage */
    const testArray = (localStorage.getItem("localStorageItems"));
    const testParse = JSON.parse(testArray);
    console.log("Title: " + testParse[0].objectTitle + " " + "Description: " + testParse[0].objectDescription);

}

/* ----------------------------- event listeners ---------------------------- */

button.addEventListener("click", function(event){
    
    /* invoke the function if the two inputs exist              */
    /* pass title input and description input to the function   */
    /* otherwise throw an error                                 */

    if (title.value || description.value){
        createNewObject(title.value, description.value);
    } else {

        /* target and display the error div */
        const error = document.querySelector('.error');
        error.style.display = 'flex';

        /* make the error div hidden again after 3000ms */
        setTimeout(function(){
            error.style.display = 'none';
            const body = document.querySelector('body');

        }, 3000)
    }
});