window.addEventListener("DOMContentLoaded", getCovid19Data());
let parsedData;

function getCovid19Data() {

    const xhr = new XMLHttpRequest;
    const url = "https://services5.arcgis.com/fsYDFeRKu1hELJJs/arcgis/rest/services/FOHM_Covid_19_FME_1/FeatureServer/1/query?f=geojson&where=1%3D1&outFields=*&orderByFields=Statistikdatum%20desc";
    const testurl = "data.json";

    xhr.open("GET", url, true);

    xhr.onload = function() {
         if (this.status === 200) {
            parsedData = JSON.parse(this.responseText);
        }
    }

    xhr.send();
}

setTimeout(() => {
    document.querySelector(".spinner").style.display = "none";
    printIt();
}, 3000);

function printIt() {
    printDailyNew();
    printDailySummary();
}

/* document.querySelector(".btn").addEventListener("click", printIt) */

function printDailyNew() {

    let reversedTotal = [];
    parsedData.features.map(elem => {
        reversedTotal.unshift(elem.properties.Totalt_antal_fall);
    });

    let reversedDates = [];
    parsedData.features.map(elem => {
        reversedDates.unshift(new Date(elem.properties.Statistikdatum).toLocaleDateString("sv-SE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    })

    let maxValue = reversedTotal.reduce((a, b) => Math.max(a, b));

    let normalizedData = [];
    reversedTotal.map(elem => {
        normalizedData.push(parseInt(((elem/maxValue)*100).toFixed(0)));
    });

    document.querySelector(".dashboard-main-content-graph-container-top").innerHTML = normalizedData.length > 0  
        ? normalizedData.map((elem, i) => (`
        <div class="graph-column-bg">
        <div class="graph">
            <div class="graph-column" style="height: ${elem}%">
                <div class="tooltip-container">
                    <div class="tooltip-left">
                        <img src="./img/icons/icons8-warm-48.svg">
                    </div>
                    <div class="tooltip-right">
                        <div class="graph-tooltip"><div class="sc">${reversedDates[i]}</div><span class="tooltip-em">${(new Intl.NumberFormat().format(reversedTotal[i]))}</span> fall rapporterade.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `)).join('\n')
        : "Ingen data kunde hämtas"; 
}

function printDailySummary() {

    let listOfIDs = [];
    parsedData.features.map(elem => {
        listOfIDs.push(elem.id);
    });
    console.log(listOfIDs);

    let dailyCases = parsedData.features[0].properties.Totalt_antal_fall;
    console.log(new Intl.NumberFormat().format(dailyCases));
    let dailyIntensiveCare = parsedData.features[0].properties.Antal_intensivvardade;
    console.log(dailyIntensiveCare);
    let dailyDeceased = parsedData.features[0].properties.Antal_avlidna;
    console.log(dailyDeceased);
    let totalCases = parsedData.features[0].properties.Kumulativa_fall;
    console.log(new Intl.NumberFormat().format(totalCases));

    let titleDate = (new Date(parsedData.features[0].properties.Statistikdatum).toLocaleDateString("sv-SE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    console.log(titleDate);

    document.querySelector(".dashboard-sub-container").innerHTML = `
        <div class="container-sub container-sub-one">
            <div class="sub-img"><img src="./img/icons/icons8-coronavirus-48.svg"></div>
            <div class="sub-text sub-text-left sub-text-one">Sjukdomsfall: <span class="sub-text-em">${(new Intl.NumberFormat().format(dailyCases))}</span></div>
        </div>
        <div class="container-sub container-sub-two">
            <div class="sub-img"><img src="./img/icons/icons8-ambulance-48.svg"></div>
            <div class="sub-text sub-text-left sub-text-two">Intensivvårdade: <span class="sub-text-em">${dailyIntensiveCare}</span></div>
        </div>
        <div class="container-sub container-sub-three">
            <div class="sub-text sub-text-right sub-text-three">Avlidna: <span class="sub-text-em">${dailyDeceased}</span></div>
            <div class="sub-img"><img src="./img/icons/icons8-hospital-bed-48.svg"></div>
        </div>
        <div class="container-sub container-sub-four">
            <div class="sub-text sub-text-right sub-text-four">Kumulativa sjukdomsfall: <span class="sub-text-em">${(new Intl.NumberFormat().format(totalCases))}</span></div>
            <div class="sub-img"><img src="./img/icons/icons8-clinic-48.svg"></div>
        </div>
    `

    document.querySelector(".dashboard-main-content-header").innerHTML = `
        <h5 class="dashboard-h5 m-t-1">Rapporterade nya fall per dag, till och med ${titleDate}</h5>
    `

/*     let latestReport = listOfIDs.reduce((a, b) => Math.max(a, b));
    console.log(parsedData);
    console.log(latestReport); */



}
