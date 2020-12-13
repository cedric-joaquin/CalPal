class MealsController < ApplicationController
    def index
        meals = Meal.all
        render json: meals
    end

    def create
        binding.pry
        meal = Meal.create(name: params[:name], calories: params[:calories], day_id: params[:day_id])
        render json: meal
    end
end
