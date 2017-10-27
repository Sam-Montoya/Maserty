INSERT INTO favorites (user_id, favorite_id)
VALUES ($1, $2)
RETURNING *;