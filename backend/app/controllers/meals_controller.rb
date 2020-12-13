class MealsController < ApplicationController
    def index
        meals = Meal.all
        render json: meals
    end

    def create
        meal = Meal.create(name: params[:name], calories: params[:calories], day_id: params[:day_id])
        render json: meal
    end

    def update
        meal = Meal.find_by(id: params[:id])
        meal.update(name: params[:name], calories: params[:calories])
        render json: meal
    end

    def destroy
        meal = Meal.find_by(id: params[:id])
        meal.destroy
    end

end
