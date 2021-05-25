class RenameUserTwoScoreInPongs < ActiveRecord::Migration[6.1]
  def change
    rename_column :pongs, :user_two_score, :user_right_score
  end
end
