class ChangeConstellations < ActiveRecord::Migration[7.0]
  def change
    add_column :constellations, :name, :string, null: false
  end
end
