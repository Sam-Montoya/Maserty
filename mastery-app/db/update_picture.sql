UPDATE users SET profile_pic = $2 WHERE username = $1
RETURNING *;