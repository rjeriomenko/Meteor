class ChangeTales < ActiveRecord::Migration[7.0]
  def change
    add_index :tales, :author_id, unique: true
  end
end
