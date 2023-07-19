class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.bigint :follower_id, null: false
      t.bigint :followee_id, null: false

      t.index [:follower_id, :followee_id], unique: true
      t.index [:followee_id, :follower_id], unique: true

      t.timestamps
    end
  end
end
