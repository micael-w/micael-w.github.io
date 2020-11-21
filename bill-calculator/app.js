/* -------------------------------- get stuff ------------------------------- */

document.querySelector(".submit").addEventListener("click", (event) => {
    event.preventDefault();
    const billAmount = document.querySelector(".bill-amount").value;
    const peopleAmount = document.querySelector(".people-amount").value;
    const tipMultiplier = document.querySelector(".tip-multiplier").value;
    document.querySelector(".results").innerHTML = "";
    Render.makeParagraphs(billAmount, peopleAmount, tipMultiplier);
    (document.querySelectorAll(".user-input")).forEach(element => {
        element.value = "";
    });
});

/* ------------------------------ render stuff ------------------------------ */

class Render {
    static makeParagraphs(b, p, t){
        const bpt = Calculate.getValues(b, p, t);
        for (let i = 0; i < (bpt.length); i++) {
            const results = document.querySelector(".results");
            results.innerHTML += `<p>${bpt[i]}</p>`;
        }
    }
}

/* ----------------------------- calculate stuff ---------------------------- */

class Calculate {
    static getValues(b, p, t){
        const bpt = [];
            bpt.push(`Total bill is: $${((b*t).toFixed(2))}`);
            bpt.push(`Amount per person is: $${(((b*t)/p).toFixed(2))}`);
            bpt.push(`Tip amount is: $${(((b*t)-b).toFixed(2))}`);
            return bpt;
    }
}