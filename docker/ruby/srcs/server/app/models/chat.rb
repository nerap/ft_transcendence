class Chat < ApplicationRecord
    belongs_to :user, optional: true
    belongs_to :chatroom, inverse_of: :chat
end
