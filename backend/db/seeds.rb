# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

7.times do 
    Day.create(date: Faker::Date.backward(days:7))
end

20.times do
    meal = Meal.create(name: Faker::Food.dish, calories: rand(100..600))
    meal.day = Day.all.sample
    meal.save
end