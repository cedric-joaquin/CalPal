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
                            Meal.renderMeal(meal);
                        }
                    })
                })
            });
        });
    }});
});
