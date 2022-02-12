class GameSerializer < ActiveModel::Serializer
  attributes :id, :state, :status,:turn, :history, :counter, :updated_at

  has_many :players
end
