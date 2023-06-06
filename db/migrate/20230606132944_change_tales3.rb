class ChangeTales3 < ActiveRecord::Migration[7.0]
  def change
    remove_index :tales, name: "index_tales_on_content"
  end
end
