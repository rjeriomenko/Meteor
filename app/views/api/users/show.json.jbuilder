json.user do
    json.extract! @user, :id, :email, :full_name, :username, :tagline, :site_settings, :profile_bio
end