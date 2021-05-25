class AddRoomIdToPongs < ActiveRecord::Migration[6.1]
  def change
    add_column :pongs, :room_id, :bigint
  end
end
