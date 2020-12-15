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
            this.renderMeal(meal);
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

    static editMeal(meal) {
        return fetch(`http://localhost:3000/meals/${meal.id.value}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: meal.id.value,
                name: meal.name.value,
                calories: meal.calories.value
            })
        })
            .then(resp => resp.json())
            .then(meal => {
                this.renderMeal(meal)
            })
    }

    static renderEditor(meal) {
        let li = document.getElementById(`meal-${meal.id}`);
        li.innerHTML = ''

        let form = document.createElement('form');
        form.className = `edit-meal-${meal.id}`

        let editName = document.createElement('input');
        editName.setAttribute('type', 'text');
        editName.setAttribute('name', 'name');
        editName.setAttribute('value', `${meal.name}`);

        let editCalories = document.createElement('input');
        editCalories.setAttribute('type', 'number');
        editCalories.setAttribute('name', 'calories');
        editCalories.setAttribute('placeholder', `${meal.calories} Calories`)
        editCalories.setAttribute('value', `${meal.calories}`);

        let mealId = document.createElement('input');
        mealId.setAttribute('type', 'hidden');
        mealId.setAttribute('name', 'id');
        mealId.setAttribute('value', `${meal.id}`);

        let editBtn = document.createElement('input');
        editBtn.setAttribute('type', 'submit');
        editBtn.setAttribute('value', 'Edit Meal');

        form.appendChild(editName);
        form.appendChild(editCalories);
        form.appendChild(mealId);
        form.appendChild(editBtn);

        li.appendChild(form);

        form.addEventListener('submit', e => {
            e.preventDefault();
            Meal.editMeal(e.target);
        })
    }

    static renderMeal(meal) {
        let li = document.createElement("li");
        let mealElement = document.getElementById(`meal-${meal.id}`);
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        editBtn.innerText = 'Edit Meal'
        deleteBtn.innerText = 'Delete Meal'
        
        li.id = `meal-${meal.id}`
        li.innerText = `${meal.name} - ${meal.calories} Calories `;
        
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        editBtn.addEventListener('click', e => Meal.renderEditor(meal));
        deleteBtn.addEventListener('click', e => Meal.deleteMeal(meal));
        
        if (mealElement) {
            mealElement.innerText = ""
            mealElement.appendChild(li);          
        } else {
            let ul = document.querySelector('div.day ul');
            ul.appendChild(li);
        }
    }
}