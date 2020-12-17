class DaysController < ApplicationController
    def index
        days = Day.all
        render json: days
    end

    def show
        day = Day.find_by(id: params[:id])
        render json: day, include:[:meals]
    end

    def create
        day = Day.create(cal_allowance: params[:cal_allowance], date:params[:date], remaining_calories:params[:remaining_calories])
        render json: day
    end
end
