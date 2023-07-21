class ChangeConstellations2 < ActiveRecord::Migration[7.0]
  def change
    remove_index :constellations, :tale_id
    remove_index :constellations, :user_id

    add_index :constellations, [:name, :tale_id], unique: true
    add_index :constellations, [:name, :user_id], unique: true
  end
end
