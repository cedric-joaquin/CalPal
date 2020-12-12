class MealsController < ApplicationController
    def index
        meals = Meal.all
        render json: meals
    end

    def create
        meal = Meal.create(name: params[:name], calories: params[:calories])
        binding.pry
        render json: meal
    end
end
