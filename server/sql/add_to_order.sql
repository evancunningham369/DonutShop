CREATE OR REPLACE PROCEDURE add_to_order(p_user_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO customer_order (cart_id, user_id, total_cost)
	SELECT  cart.cart_id, cart.user_id, SUM(donut.price * cart_item.quantity) AS total_price
		FROM donut
		JOIN cart_item ON donut.donut_id = cart_item.donut_id
		JOIN cart ON cart.user_id = p_user_id
		GROUP BY cart.cart_id;
END;
$$;
