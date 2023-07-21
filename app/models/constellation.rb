class Constellation < ApplicationRecord
    validates :name, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User,
        optional: true

    belongs_to :tale,
        foreign_key: :tale_id,
        class_name: :Tale
end
