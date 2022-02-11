class Game < ApplicationRecord
  # serialize :game_state, JSON
  has_many :players
  has_many :users, through: :players
    
end
