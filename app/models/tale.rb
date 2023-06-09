class Tale < ApplicationRecord
validates :title, :content, :author_id, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  has_many :stars,
    foreign_key: :tale_id,
    class_name: :Star,
    dependent: :destroy

  has_many :starring_users,
    through: :stars,
    source: :user,
    dependent: :destroy

  has_many :comets,
    foreign_key: :tale_id,
    class_name: :Comet,
    dependent: :destroy

  has_many :cometing_users,
    through: :comets,
    source: :user,
    dependent: :destroy

  before_validation :ensure_title

  def ensure_title
    self.title ||= 'Untitled tale'
  end

end
