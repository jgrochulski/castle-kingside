class GameSerializer < ActiveModel::Serializer
  attributes :id, :game_state, :player1, :player2, :turn, :history, :counter
end
