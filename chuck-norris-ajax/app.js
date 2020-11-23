document.querySelector(".btn").addEventListener("click", (event) => giveMeAJoke(event));

function giveMeAJoke() {
    const request = new XMLHttpRequest
    request.open("GET", "https://api.chucknorris.io/jokes/random", true);
    request.onload = function(){
        if(this.status === 200){
            let data =  this.responseText;
            joke = JSON.parse(data);
            console.log(joke.value);
            let li = document.createElement("li");
            li.innerHTML = `
            <li class="card cardAnimation">
                <div class="icon">
                    <img src="https://assets.chucknorris.host/img/avatar/chuck-norris.png">
                </div>
                <div class="cn-quote">
                    <p class="cn-text">${joke.value}</p>
                </div>
            </li>
            `
            document.querySelector("ul").appendChild(li);
        }; 
    }
    request.send();
}
