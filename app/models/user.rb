class User < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true, length: { minimum: 3, maximum: 22 }
  validates :password, length: { minimum: 4, maximum: 28 }

end
