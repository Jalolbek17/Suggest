const input = document.querySelector("#pokemon-name");
const suggestBox = document.querySelector(".suggestions-box");

var pokemons = new Array();

fetch("https://pokeapi.co/api/v2/pokemon/")
.then(response => response.json())
.then(data => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=" + data.count)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.results.length; i++) {
            pokemons.push(data.results[i].name);
        }
    })
})

function addSuggest(name) {
    let newSuggest = document.createElement("p");
    newSuggest.id = name;
    newSuggest.classList.add("suggest");
    newSuggest.innerHTML = name;
    suggestBox.appendChild(newSuggest);
}

function deleteSuggest(name) {
    let suggestToRemove = document.getElementById(name);
    suggestBox.removeChild(suggestToRemove);
}

input.addEventListener("input", function() {
    let v = this.value.toLowerCase();
    for (let i = 0; i < pokemons.length; i++) {
        if (!v) {
            suggestBox.innerHTML = "";
        } else if (pokemons[i].startsWith(v) && !document.getElementById(pokemons[i])) {
            addSuggest(pokemons[i]);
        } else if (!pokemons[i].startsWith(v) && document.getElementById(pokemons[i])) {
            deleteSuggest(pokemons[i]);
        }
    }
});

document.addEventListener("click", e => {
    if (e.target.classList.contains("suggest") && e.target) {
        input.value = e.target.innerHTML;
        suggestBox.innerHTML = "";
    }
});