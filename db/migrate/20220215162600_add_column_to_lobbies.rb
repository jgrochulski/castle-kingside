class AddColumnToLobbies < ActiveRecord::Migration[7.0]
  def change
    add_column :lobbies, :user_id, :integer
  end
end
