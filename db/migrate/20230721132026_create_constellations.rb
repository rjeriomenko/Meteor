class CreateConstellations < ActiveRecord::Migration[7.0]
  def change
    create_table :constellations do |t|
      t.bigint :user_id, null: true
      t.bigint :tale_id, null: true

      t.index [:user_id], unique: true
      t.index [:tale_id], unique: true

      t.timestamps
    end
  end
end
