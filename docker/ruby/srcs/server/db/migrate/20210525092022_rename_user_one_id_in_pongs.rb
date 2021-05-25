class RenameUserOneIdInPongs < ActiveRecord::Migration[6.1]
  def change
    rename_column :pongs, :user_one_id, :user_left_id
  end
end
