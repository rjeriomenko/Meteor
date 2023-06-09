class ChangeStars < ActiveRecord::Migration[7.0]
  def change
    change_column_null :stars, :user_id, true
    change_column_null :stars, :tale_id, true
  end
end
