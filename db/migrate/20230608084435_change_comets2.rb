class ChangeComets2 < ActiveRecord::Migration[7.0]
  def change
    change_column_null :comets, :content, false
    change_column_null :comets, :user_id, false
    change_column_null :comets, :tale_id, false
  end
end
