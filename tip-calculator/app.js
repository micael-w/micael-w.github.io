/* ------------------------------- make class ------------------------------- */

class TipCalculator {

/* ------------------------------- init stuff ------------------------------- */

    static init() {
        document.querySelector(".submit").addEventListener("click", (event) => TipCalculator.eventListener(event));
    }

/* -------------------------------- do stuff -------------------------------- */

    static eventListener(event) {
        event.preventDefault();
        const billAmount = this.getInputValues(".bill-amount");
        const peopleAmount = this.getInputValues(".people-amount");
        const tipMultiplier = this.getInputValues(".tip-multiplier");
        document.querySelector(".results").innerHTML = "";
        TipCalculator.render(billAmount, peopleAmount, tipMultiplier);
        document.querySelectorAll(".user-input").forEach((element) => (element.value = ""));
    }

/* -------------------------------- get stuff ------------------------------- */

    static getInputValues(selector) {
        return document.querySelector(selector).value;
    }

/* ----------------------------- calculate stuff ---------------------------- */


    static getValues(b, p, t){
        const bpt = [];
        bpt.push(`Total bill is: $${((b*t).toFixed(2))}`);
        bpt.push(`Amount per person is: $${(((b*t)/p).toFixed(2))}`);
        bpt.push(`Tip amount is: $${(((b*t)-b).toFixed(2))}`);
        return bpt;
    }

/* ------------------------------ render stuff ------------------------------ */

    static render(b, p, t){
        const bpt = this.getValues(b, p, t);
        bpt.forEach((i) => {
            document.querySelector(".results").innerHTML += `<p>${i}</p>`;
        });
    }
}

/* -------------------------------- let's go! ------------------------------- */

TipCalculator.init();