class AddRatingToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :elo_rating, :decimal
  end
end
