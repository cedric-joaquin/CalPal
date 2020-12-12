class Day {
    constructor(allowance, date) {
        this.allowance = allowance;
        this.date = date;
    }

    static addDay(day) {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                cal_allowance: day.allowance.value,
                date: day.date.value
            })
        }

        fetch("http://localhost:3000/days", configObj)
            .then(resp => resp.json())
            .then(day => {
                let newDay = new Day(day);
                Day.addDay(newDay);
            })
    }

    static newCard(day) {
        let div = document.createElement("div");
        div.className = "day";
        let h2 = document.createElement("h2");
        let date = new Date(Date.parse(day.date));
        h2.innerText = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
        div.appendChild(h2);
        document.body.appendChild(div);
    }

    static getDays() {
        return fetch('http://localhost:3000/days')
            .then(resp => resp.json());
    }
}

class Meal {
    constructor(name, calories, day) {
        this.name = name;
        this.calores = calories;
        this.day = day;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let day = new Day(2000, new Date());
    let dayCard = Day.newCard(day);
});
