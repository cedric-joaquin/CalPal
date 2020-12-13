class Day {
    constructor(allowance, date) {
        this.allowance = allowance;
        this.date = date;
    }

    static postDay(day) {
        return fetch('http://localhost:3000/days', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                cal_allowance: day.allowance,
                date: day.date,
            })
        })
        .then(resp => resp.json())
        .then(day => {
            return this.newCard(day);
        });
    }

    static newCard(day) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let div = document.createElement("div");
        div.className = 'day';
        div.id = `${day.id}`

        let h2 = document.createElement("h2");
        let date = new Date(Date.parse(day.date));
        h2.innerText = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        div.appendChild(h2);

        let calAllowance = document.createElement("h3") ; 
        calAllowance.innerText= `Daily Caloric Allowance: ${day.cal_allowance} calories`
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

        // Hidden day input
        let dayInput = document.createElement('input');
        dayInput.setAttribute('type', 'hidden');
        dayInput.setAttribute('name', 'day_id');
        dayInput.setAttribute('value', `${day.id}`);

        // Create Submit Button
        let submitBtn = document.createElement('input');
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("value", "Add Meal");
        submitBtn.id = "add-meal-button"

        // Append Inputs to Form
        form.appendChild(nameInput);
        form.appendChild(br);
        form.appendChild(calorieInput);
        form.appendChild(br.cloneNode());
        form.appendChild(dayInput);
        form.appendChild(submitBtn);

        // Form event listener
        form.addEventListener('submit', e => {
            e.preventDefault();
            Meal.postMeal(e.target);
        })

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
        this.day = day
    }

    static getMeals() {
        return fetch('http://localhost:3000/meals')
            .then(resp => resp.json())
    }

    static postMeal(data) {
        return fetch('http://localhost:3000/meals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name.value,
                calories: data.calories.value,
                day_id: data.day_id.value
            })
        })
        .then(resp => resp.json())
        .then(meal => {
            this.newMeal(meal);
        });
    }

    static deleteMeal(meal) {
        fetch(`http://localhost:3000/meals/${meal.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: meal.id
            })
        })
        .then( () => {
            document.getElementById(`meal-${meal.id}`).remove();
        })
    }

    static newMeal(meal) {
        let ul = document.querySelector('div.day ul');
        let li = document.createElement("li");

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete Meal'
        
        
        li.id = `meal-${meal.id}`
        li.innerText = `${meal.name} - ${meal.calories} Calories `;
        li.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', e => Meal.deleteMeal(meal));
        ul.appendChild(li);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/days')
    .then(resp => resp.json())
    .then(days => { if(Object.keys(days).length == 0) {
        Day.postDay(new Day(2000, new Date()));
    } else {
        Day.getDays().then(days => {
            days.forEach(day => {
                Day.newCard(day);
                Meal.getMeals().then(meals => {
                    meals.forEach(meal => {
                        if (meal.day_id == day.id) {
                            Meal.newMeal(meal);
                        }
                    })
                })
            });
        });
    }});
});
