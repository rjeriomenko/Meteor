json.follow do
    json.extract! @follow, :id, :followee_id, :follower_id
end