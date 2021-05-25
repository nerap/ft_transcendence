class AddLooserToPongs < ActiveRecord::Migration[6.1]
  def change
    add_column :pongs, :looser, :bigint
  end
end
