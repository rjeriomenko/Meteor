class CreateComets < ActiveRecord::Migration[7.0]
  def change
    create_table :comets do |t|
      t.string :content
      t.integer :user_id
      t.integer :tale_id
      
      t.index [:user_id, :tale_id]
      t.index [:tale_id, :user_id]

      t.timestamps
    end
  end
end
