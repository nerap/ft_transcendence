class Chatroom < ApplicationRecord
    has_many :chat, dependent: :destroy, inverse_of: :chatroom
end
