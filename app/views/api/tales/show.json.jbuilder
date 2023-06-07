json.tale do
    json.extract! @tale, :id, :title, :content, :author_id, :publish_time
end