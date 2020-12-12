class Day {
    constructor(allowance, date) {
        this.allowance = allowance;
        this.date = date;
    }

    static addDay(day) {
        let newDay = new Day(day.allowance, day.date);

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                cal_allowance: newDay.allowance,
                date: day.date
            })
        }

        fetch("http://localhost:3000/days", configObj)
            .then
    }

    static newDayCard(day) {
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
    Day.getDays().then(days => {
        days.forEach(day => {
            Day.newDayCard(day);
        })
    })
});

