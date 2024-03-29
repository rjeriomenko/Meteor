class Follow < ApplicationRecord
    validates :follower_id, :followee_id, presence: true
    validates :followee, uniqueness: { scope: :follower, message: "Cannot follow same user twice." }

    belongs_to :follower,
        foreign_key: :follower_id,
        class_name: :User

    belongs_to :followee,
        foreign_key: :followee_id,
        class_name: :User

end
