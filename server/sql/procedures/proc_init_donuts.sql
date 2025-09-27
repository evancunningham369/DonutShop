CREATE OR REPLACE PROCEDURE init_donuts()
LANGUAGE plpgsql
AS $$
BEGIN

	INSERT INTO donut(name, price)
	VALUES
		('Glazed', 1.00),
		('Cake', 2.00),
		('Plain', .50),
		('Chocolate Sprinkles', 1.50);
END;
$$;