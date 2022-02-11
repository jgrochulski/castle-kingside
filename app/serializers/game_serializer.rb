class GameSerializer < ActiveModel::Serializer
  attributes :id, :state, :status,:turn, :history, :counter

  has_many :players
end
