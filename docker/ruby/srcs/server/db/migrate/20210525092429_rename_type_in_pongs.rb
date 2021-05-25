class RenameTypeInPongs < ActiveRecord::Migration[6.1]
  def change
    rename_column :pongs, :type, :mode
  end
end
