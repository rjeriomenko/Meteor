json.array! @stars do |star|
    json.id star.id
    json.user_id star.user_id
    json.tale_id star.tale_id
end