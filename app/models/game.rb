class Game < ApplicationRecord
  # serialize :game_state, JSON
  has_many :players, dependent: :destroy
  has_many :users, through: :players
    
end
