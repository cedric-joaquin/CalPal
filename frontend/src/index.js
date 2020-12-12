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
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let div = document.createElement("div");
        div.className = "day";

        let h2 = document.createElement("h2");
        let date = new Date(Date.parse(day.date));
        h2.innerText = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        div.appendChild(h2);

        let calAllowance = document.createElement("h3") ; 
        calAllowance.innerText= `Daily Caloric Allowance: ${day.allowance} calories`
        div.appendChild(calAllowance);

        let h3 = document.createElement("h3");
        h3.innerText = 'Meals'
        div.appendChild(h3);

        let ul = document.createElement("ul");
        div.appendChild(ul)
        return document.body.appendChild(div);
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

    static newMeal(meal) {
        let li = document.createElement("li");
        return li.innerText = `${meal.name} - ${meal.calories} Calories`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/days')
        .then(resp => resp.json())
        .then(days => { if(Object.keys(days).length == 0) {
            let day = new Day(2000, new Date());
            let dayCard = Day.newCard(day);
            let ul = dayCard.querySelector('ul')
        } else {
            Day.getDays().then(day => {
                Day.newCard(day);
            });
        }});
});
