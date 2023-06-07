json.array! @users do |user|
    json.id user.id
    json.email user.email
    json.full_name user.full_name
    json.username user.username
    json.tagline user.tagline
    json.site_settings user.site_settings
    json.profile_bio user.profile_bio
end