class ChangeTales2 < ActiveRecord::Migration[7.0]
  def change
    remove_index :tales, name: "index_tales_on_author_id"
    add_index :tales, :author_id, unique: false
  end
end
