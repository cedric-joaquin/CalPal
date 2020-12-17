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
                cal_allowance: day.allowance.value,
                date: day.date.value,
            })
        })
        .then(resp => resp.json())
        .then(day => {
            document.querySelector('.welcome-card').remove();
            return this.newCard(day);
        });
    }

    static welcomeCard() {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let div = document.createElement("div");
        div.className = 'welcome-card';
        
        let h2 = document.createElement("h2");
        let date = new Date();
        h2.innerText = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        div.appendChild(h2);

        let h3 = document.createElement('h3');
        h3.innerText = 'Welcome to CalPal, to get started please submit your daily calorie goal below:'
        div.appendChild(h3);

        let form = document.createElement('form');
        let br = document.createElement('br');
        form.className = 'calorie-goal';

        let calInput = document.createElement('input');
        calInput.setAttribute('type', 'number');
        calInput.setAttribute('name', 'allowance');
        calInput.setAttribute('placeholder', '2000 cals');

        let dayInput = document.createElement('input');
        dayInput.setAttribute('type', 'hidden');
        dayInput.setAttribute('name', 'date');
        dayInput.setAttribute('value', date)

        let submitBtn = document.createElement('button');
        submitBtn.className = 'btn';
        submitBtn.setAttribute('type', 'submit');
        submitBtn.innerText = 'Start Tracking';

        form.appendChild(calInput);
        form.append(dayInput);
        form.appendChild(br);
        form.appendChild(submitBtn);

        form.addEventListener('submit', e => {
            e.preventDefault();
            console.log(e.target);
            this.postDay(e.target);
        });

        div.appendChild(form);

        document.body.appendChild(div);
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