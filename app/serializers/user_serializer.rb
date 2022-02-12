class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :elo_rating

  has_many :games
end
