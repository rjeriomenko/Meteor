class Tale < ApplicationRecord
validates :title, :content, :author_id, presence: true
validates :title,
  length: { in: 3..30 }

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  before_validation :ensure_title

  def ensure_title
    self.title ||= 'Untitled tale'
  end

end
