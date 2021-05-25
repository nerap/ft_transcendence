class RenameUserOneScoreInPongs < ActiveRecord::Migration[6.1]
  def change
    rename_column :pongs, :user_one_score, :user_left_score
  end
end
