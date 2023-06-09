class ChangeStars2 < ActiveRecord::Migration[7.0]
  def change
    change_column_null :stars, :user_id, false
    change_column_null :stars, :tale_id, false
  end
end
