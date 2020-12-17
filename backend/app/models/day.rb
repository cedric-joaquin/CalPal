class Day < ApplicationRecord
    has_many :meals

    def total
        self.remaining_calories = self.cal_allowance
        self.meals.each do |meal|
            self.remaining_calories -= meal.calories
        end
        self.save
        return self.remaining_calories
    end
end
