class LobbySerializer < ActiveModel::Serializer
  attributes :id, :username, :score, :user_id
end
