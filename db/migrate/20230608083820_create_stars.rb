class CreateStars < ActiveRecord::Migration[7.0]
  def change
    create_table :stars do |t|
      t.integer :user_id
      t.integer :tale_id

      t.index [:user_id, :tale_id]
      t.index [:tale_id, :user_id]

      t.timestamps
    end
  end
end
