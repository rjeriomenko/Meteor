class ChangeUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :profile_bio, true
    change_column_null :users, :tagline, true
  end
end
