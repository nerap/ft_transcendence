class AddPlayingToPongs < ActiveRecord::Migration[6.1]
  def change
    add_column :pongs, :playing, :boolean
  end
end
