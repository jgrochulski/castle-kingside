class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.text :game_state

      t.timestamps
    end
  end
end
