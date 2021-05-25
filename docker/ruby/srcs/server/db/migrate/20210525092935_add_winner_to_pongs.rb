class AddWinnerToPongs < ActiveRecord::Migration[6.1]
  def change
    add_column :pongs, :winner, :bigint
  end
end
