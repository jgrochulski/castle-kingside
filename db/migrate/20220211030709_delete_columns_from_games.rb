class DeleteColumnsFromGames < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :player1
    remove_column :games, :player2
  end
end
