class AddDayIdToMeal < ActiveRecord::Migration[6.0]
  def change
    add_column :meals, :day_id, :integer
  end
end
