class CreateDays < ActiveRecord::Migration[6.0]
  def change
    create_table :days do |t|
      t.integer :cal_allowance
      t.datetime :date
      t.integer :remaining_calories

      t.timestamps
    end
  end
end
