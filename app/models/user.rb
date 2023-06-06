class User < ApplicationRecord
    has_secure_password

    validates :email, :username, :full_name, :session_token, presence: true
    validates :email, :username, :session_token, uniqueness: true
    validates :username,
        length: { in: 3..30 },
        format: { without: URI::MailTo::EMAIL_REGEXP, message: "Username should not be an email" }
    validates :email,
        length: { in: 3..255 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :full_name,
        length: { in: 3..255 }
    validates :password,
        length: { in: 6..255 },
        allow_nil: true 
    validates :tagline,
        length: { in: 1..255 }, 
        allow_nil: true
    validates :profile_bio,
        length: { in: 1..255 }, 
        allow_nil: true

    before_validation :ensure_session_token, :ensure_username

    has_many :tales,
        foreign_key: :author_id,
        class_name: :Tale,
        dependent: :destroy

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        self.session_token
    end

    def ensure_username
        self.username ||= generate_default_username
    end

    def generate_default_username
        if self.email
            cutoff_index = self.email.index("@")
            username = self.email[...cutoff_index]
            username.gsub!(/\W|_/, '')
            self.username ||= username
        end
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user&.authenticate(password)
            user
        else
            nil
        end
    end

    private

    def generate_unique_session_token
        while token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

end