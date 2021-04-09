class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :username, presence: true, uniqueness: { case_sensitive: false }, length: { in: 3..20 }
  has_many :chatroom, dependent: :destroy, :foreign_key => "owner"
  has_many :chatroom_ban, dependent: :destroy
  has_many :chatroom_mute, dependent: :destroy
  has_many :chat, dependent: :destroy
  has_many :private_message, dependent: :destroy
end
