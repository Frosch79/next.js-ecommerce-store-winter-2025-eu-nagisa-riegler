--Create products table
CREATE TABLE products(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_name varchar(30) NOT NULL ,
  price integer NOT NULL
);

--inserting into products
INSERT INTO
  products(
    product_name,
    price
  )
  VALUES
  ('Food', 15 ),
 ('Toy', 3 ),
 ('Toilet', 25 ),
 ('Sofa', 100 ),
 ('Cat-Walk', 500 );

--Select all products
SELECT * FROM products;
