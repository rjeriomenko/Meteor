class ChangeComets < ActiveRecord::Migration[7.0]
  def change
    change_column_null :comets, :content, true
    change_column_null :comets, :user_id, true
    change_column_null :comets, :tale_id, true
  end
end
