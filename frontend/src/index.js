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

        //Create Meal Form
        let form = document.createElement("form");
        let br = document.createElement("br")
        form.className = "new-meal"

        // Create Name Input
        let nameInput = document.createElement('input');
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("name", "name");
        nameInput.setAttribute("placeholder", "Meal Name");

        // Create Calorie Input
        let calorieInput = document.createElement('input');
        calorieInput.setAttribute("type", "number");
        calorieInput.setAttribute("name", "calories");
        calorieInput.setAttribute("placeholder", "0 calories");

        // Create Submit Button
        let submitBtn = document.createElement('input');
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("value", "Add Meal");
        submitBtn.id = "add-meal-button"

        // Append Form Children to Form
        form.appendChild(nameInput);
        form.appendChild(br);
        form.appendChild(calorieInput);
        form.appendChild(br.cloneNode());
        form.appendChild(submitBtn);

        div.appendChild(form);

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
        this.calories = calories;
        this.day = day;
    }

    static postMeal(meal) {
        fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'meal': meal.name,
                'calories': meal.calories,
                'day': meal.day
            })
        })
        .then(resp => resp.json())
        .then(meal => {
            this.newMeal(meal);
        });
    }

    static newMeal(meal) {
        let li = document.createElement("li");
        return li.innerText = `${meal.name} - ${meal.calories} Calories`;
    }
}

let newMealBtn = document.getElementById("add-meal-button");

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

newMealBtn.addEventListener("click", )