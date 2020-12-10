class DaysController < ApplicationController
    def index
        days = Day.all
        render json: days
    end

    def show
        day = Day.find_by(id: params[:id])
        render json: day, include:[:meals]
    end
end
