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

function fetchDays() {
    fetch("localhost:3000/days")
}

document.addEventListener("DOMContentLoaded", function() {

});