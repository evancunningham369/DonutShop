SELECT SUM(donut.price * cart_item.quantity) AS total_price
		FROM donut
		JOIN cart_item ON donut.donut_id = cart_item.donut_id
		JOIN cart ON cart.user_id = $1;