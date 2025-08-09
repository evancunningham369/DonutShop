SELECT user_id, hashed_password 
FROM account
 WHERE username= $1;