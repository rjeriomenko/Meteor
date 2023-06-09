json.array! @comets do |comet|
    json.id comet.id
    json.content comet.content
    json.user_id comet.user_id
    json.tale_id comet.tale_id
end