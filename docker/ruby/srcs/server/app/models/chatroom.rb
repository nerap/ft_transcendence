class Chatroom < ApplicationRecord
    has_many :chat, dependent: :destroy, inverse_of: :chatroom
    validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 3..20 }
    validates :password, :if => :check_if_private, length: { minimum: 6 }

    def check_if_private
        chatroom_type == "private"
    end

    # def as_json(options = {})
        # super(options.merge(:only => [ :id, :name, :chatroom_type, :owner ]))
    # end
end
