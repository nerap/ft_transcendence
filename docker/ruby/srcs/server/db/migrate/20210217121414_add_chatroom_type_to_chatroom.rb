class AddChatroomTypeToChatroom < ActiveRecord::Migration[6.1]
  def change
    add_column :chatrooms, :chatroom_type, :string
  end
end
