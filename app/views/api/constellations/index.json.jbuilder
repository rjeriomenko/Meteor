json.array! @constellations do |constellation|
    json.id constellation.id
    json.name constellation.name
    json.user_id constellation.user_id
    json.tale_id constellation.tale_id
end