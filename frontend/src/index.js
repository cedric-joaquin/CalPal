class Day {
    constructor(allowance, date) {
        this.allowance = allowance;
        this.date = date;
    }
}

function newDay() {
    let div = document.createElement("div");
    div.className = "day"
}

function getDays() {
    fetch("localhost:3000/days")
    .then(resp => resp.json())
}

document.addEventListener("DOMContentLoaded", function() {

});