class ChangeColumnsInGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :status, :string
    rename_column :games, :game_state, :state
  end
end
