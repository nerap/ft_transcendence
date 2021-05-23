class CreatePongs < ActiveRecord::Migration[6.1]
  def change
    create_table :pongs do |t|
      t.bigint :user_one_id
      t.bigint :user_two_id
      t.bigint :user_one_score
      t.bigint :user_two_score
      t.string :type
      t.boolean :ladder
      t.boolean :pending
      t.boolean :started
      t.boolean :done

      t.timestamps
    end
  end
end
