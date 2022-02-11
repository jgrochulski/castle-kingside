class GameSerializer < ActiveModel::Serializer
  attributes :id, :state, :status, :player1, :player2, :turn, :history, :counter

  has_many :players
end
