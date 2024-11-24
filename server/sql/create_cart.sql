CREATE OR REPLACE FUNCTION get_cart(p_user_id INT)
RETURNS TABLE(
	name CHARACTER VARYING,
	price NUMERIC,
	quantity INTEGER,
	total_cost NUMERIC
) AS $$
BEGIN
	RETURN QUERY
	SELECT donut.name, donut.price, cart_item.quantity, donut.price * cart_item.quantity AS total_cost
	FROM donut
	JOIN cart_item ON donut.donut_id = cart_item.donut_id
	JOIN cart ON cart.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;