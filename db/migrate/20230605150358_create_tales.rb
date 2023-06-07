class CreateTales < ActiveRecord::Migration[7.0]
  def change
    create_table :tales do |t|
      t.string :title, null: false
      t.string :content, null: false
      t.bigint :author_id, null: false, foreign_key: true
      t.string :publish_time

      t.timestamps
    end
    add_index :tales, :content, unique: true
  end
end
