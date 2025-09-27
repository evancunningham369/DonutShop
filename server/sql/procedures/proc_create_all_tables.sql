CREATE OR REPLACE PROCEDURE create_all_tables()
LANGUAGE plpgsql
AS $$
BEGIN
	-- Create 'users' table
		CREATE TABLE IF NOT EXISTS account(
			user_id SERIAL PRIMARY KEY,
			username VARCHAR(255) UNIQUE,
			hashed_password VARCHAR(255)
	);

	-- Create 'cart' table
		CREATE TABLE IF NOT EXISTS cart(
			cart_id SERIAL PRIMARY KEY,
			user_id INT NOT NULL UNIQUE REFERENCES account(user_id) ON DELETE CASCADE,
			created_at TIMESTAMPTZ DEFAULT NOW()
		);

	-- Create 'donut' table
		CREATE TABLE IF NOT EXISTS donut(
			donut_id SERIAL PRIMARY KEY,
			name VARCHAR(40) NOT NULL UNIQUE,
			price DECIMAL(10, 2) NOT NULL CHECK (price >= 0)
	   ); 
		
	-- Create 'cart-item' table
		CREATE TABLE IF NOT EXISTS cart_item(
			cart_item_id SERIAL PRIMARY KEY,
			cart_id INT REFERENCES cart(cart_id) ON DELETE CASCADE,
			donut_id INT REFERENCES donut(donut_id),
			quantity INT NOT NULL,
			UNIQUE (cart_id, donut_id)
		);

	-- Create 'customer_order' table
	CREATE TABLE IF NOT EXISTS customer_order(
		order_id SERIAL PRIMARY KEY,
		user_id INT NOT NULL,
		cart_id INT NOT NULL,
		order_date TIMESTAMP DEFAULT NOW(),
		total_cost NUMERIC NOT NULL
	);
END;
$$;