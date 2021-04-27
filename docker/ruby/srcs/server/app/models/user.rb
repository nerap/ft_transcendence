class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:marvin]
  devise :two_factor_authenticatable,
         :otp_secret_encryption_key => "00805870a2147e34eda3777504a715580c60c5d88323c477118ecedcfc582216"
       #   :otp_secret_encryption_key => ENV['ENCRYPTION_KEY']

  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { in: 3..20 }
  has_many :chatroom, dependent: :destroy, :foreign_key => "owner"
  has_many :chatroom_ban, dependent: :destroy
  has_many :chatroom_mute, dependent: :destroy
  has_many :chat, dependent: :destroy
  has_many :private_message, dependent: :destroy

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.username = auth.info.login
      user.avatar = auth.info.image
      user.password = Devise.friendly_token[0,20]
      user.save
    end
  end
end
