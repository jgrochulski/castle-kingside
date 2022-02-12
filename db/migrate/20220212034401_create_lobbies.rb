class CreateLobbies < ActiveRecord::Migration[7.0]
  def change
    create_table :lobbies do |t|
      t.string :username
      t.string :score

      t.timestamps
    end
  end
end
