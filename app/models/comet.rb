class Comet < ApplicationRecord
    validates :content, :user_id, :tale_id, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :tale,
        foreign_key: :tale_id,
        class_name: :Tale

end