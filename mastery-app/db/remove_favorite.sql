DELETE FROM favorites WHERE user_id = $1 AND favorite_id = $2
RETURNING *;