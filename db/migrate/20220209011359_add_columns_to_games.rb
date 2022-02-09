class AddColumnsToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :player1, :string
    add_column :games, :player2, :string
    add_column :games, :turn, :string
    add_column :games, :history, :string
    add_column :games, :counter, :integer
  end
end
