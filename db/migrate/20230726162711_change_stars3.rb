class ChangeStars3 < ActiveRecord::Migration[7.0]
  def change
    remove_index :stars, [:user_id, :tale_id]
    remove_index :stars, [:tale_id, :user_id]

    add_index :stars, [:user_id, :tale_id], unique: true
    add_index :stars, [:tale_id, :user_id], unique: true
  end
end
