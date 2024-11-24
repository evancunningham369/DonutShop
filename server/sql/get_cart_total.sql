CREATE OR REPLACE FUNCTION get_cart_total(p_user_id INT)
RETURNS NUMERIC
AS $$
BEGIN

	RETURN (
		SELECT SUM(donut.price * cart_item.quantity) AS total_price
		FROM donut
		JOIN cart_item ON donut.donut_id = cart_item.donut_id
		JOIN cart ON cart.user_id = p_user_id
	);

END;
$$ LANGUAGE plpgsql