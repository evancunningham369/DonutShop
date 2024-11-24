CREATE TRIGGER clear_cart_trigger
AFTER INSERT ON customer_order
FOR EACH ROW
EXECUTE FUNCTION clear_cart_on_order();
