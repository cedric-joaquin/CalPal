class Meal < ApplicationRecord
    belongs_to :day, optional: true
end
