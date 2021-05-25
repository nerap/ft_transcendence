class RenameUserTwoIdInPongs < ActiveRecord::Migration[6.1]
  def change
    rename_column :pongs, :user_two_id, :user_right_id
  end
end
