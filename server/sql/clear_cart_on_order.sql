CREATE OR REPLACE FUNCTION clear_cart_on_order()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete rows from the cart for the user who placed the order
    DELETE FROM cart
    WHERE user_id = NEW.user_id;

    -- Return the newly inserted row
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;