class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :registerable,
         :recoverable, :rememberable, :validatable
  devise :two_factor_authenticatable,
         :otp_secret_encryption_key => "00805870a2147e34eda3777504a715580c60c5d88323c477118ecedcfc582216"
       #   :otp_secret_encryption_key => ENV['ENCRYPTION_KEY']

  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { in: 3..20 }
  has_many :chatroom, dependent: :destroy, :foreign_key => "owner"
  has_many :chatroom_ban, dependent: :destroy
  has_many :chatroom_mute, dependent: :destroy
  has_many :chat, dependent: :destroy
  has_many :private_message, dependent: :destroy
end
