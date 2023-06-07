json.array! @tales do |tale|
    json.id tale.id
    json.title tale.title
    json.content tale.content
    json.author_id tale.author_id
    json.publish_time tale.publish_time
end