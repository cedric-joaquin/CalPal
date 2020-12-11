class Day {
    constructor(allowance, date) {
        this.allowance = allowance;
        this.date = date;
    }
}

function newDay(day) {
    let div = document.createElement("div");
    div.className = "day";
    let h2 = document.createElement("h2");
    h2.innerText = `Date: ${day.date}`;
    div.appendChild(h2);
    document.body.appendChild(div);
}

function getDays() {
    return fetch('http://localhost:3000/days')
        .then(resp => resp.json());
}

document.addEventListener("DOMContentLoaded", function() {
    getDays().then(days => {
        days.forEach(day => {
            newDay(day);
        })
    })
});