CREATE DATABASE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);

SELECT * FROM products;

CREATE TABLE departments (
	department_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR(45) NOT NULL,
    over_head_costs VARCHAR(45) NOT NULL
);


ALTER TABLE products
ADD product_sales INT;