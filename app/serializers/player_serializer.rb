class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :role
  has_one :user
  has_one :game
end
