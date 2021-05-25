class AddTieToPongs < ActiveRecord::Migration[6.1]
  def change
    add_column :pongs, :tie, :boolean
  end
end
