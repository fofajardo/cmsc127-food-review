DROP DATABASE IF EXISTS foodreview;
CREATE DATABASE foodreview;
USE foodreview;

CREATE TABLE user (
    userid INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    is_owner BOOLEAN DEFAULT FALSE,
    is_end_user BOOLEAN DEFAULT TRUE,
    CONSTRAINT user_userid_pk PRIMARY KEY(userid),
    CONSTRAINT user_username UNIQUE(username),
    CONSTRAINT user_email UNIQUE(email)
);

CREATE TABLE foodestablishment (
    foodestid INT NOT NULL AUTO_INCREMENT,
    location VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    average_rating DECIMAL(4,2),
    userid INT,
    CONSTRAINT foodestablishment_foodestid_pk PRIMARY KEY(foodestid),
    CONSTRAINT foodestablishment_userid_fk FOREIGN KEY(userid) REFERENCES user(userid)
);

CREATE TABLE fooditem (
    fooditemid INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2),
    userid INT,
    foodestid INT,
    CONSTRAINT fooditem_fooditemid_pk PRIMARY KEY(fooditemid),
    CONSTRAINT fooditem_userid_fk FOREIGN KEY(userid) REFERENCES user(userid),
    CONSTRAINT fooditem_foodest_fk FOREIGN KEY(foodestid) REFERENCES foodestablishment(foodestid)
);

CREATE TABLE foodtype (
    fooditemid INT,
    type VARCHAR(255),
    CONSTRAINT fooditem_fooditemid_foodtype_pk PRIMARY KEY(fooditemid, type),
    CONSTRAINT fooditem_fooditemid_fk FOREIGN KEY(fooditemid) REFERENCES fooditem(fooditemid)
);

CREATE TABLE review (
    reviewid INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(18) NOT NULL,
    note TEXT,
    date DATE,
    rating DECIMAL(4,2),
    userid INT,
    foodestid INT,
    fooditemid INT,
    CONSTRAINT review_reviewid_pk PRIMARY KEY(reviewid),
    CONSTRAINT review_userid_fk FOREIGN KEY(userid) REFERENCES user(userid),
    CONSTRAINT review_foodestid_fk FOREIGN KEY(foodestid) REFERENCES foodestablishment(foodestid),
    CONSTRAINT review_fooditemid_fk FOREIGN KEY(fooditemid) REFERENCES fooditem(fooditemid)
);

-- Values

INSERT INTO user (name, password, username, email, is_owner, is_end_user) VALUES
    ("Jose P. Rizal",       "password1234", "jpr1890",     "jpr@mudspring.uplb.edu.ph", 0, 1),
    ("Frank O. Wilco",      "password1234", "frankwilco",  "fow@mudspring.uplb.edu.ph", 1, 0),
    ("Saysay F. Ramon",     "password1234", "ramonsf",     "sfr@mudspring.uplb.edu.ph", 0, 1),
    ("William M. Saunders", "password1234", "williams21",  "wms@mudspring.uplb.edu.ph", 1, 0),
    ("Jane L. Ryan",        "password1234", "janeryan",    "jlr@mudspring.uplb.edu.ph", 0, 1);

INSERT INTO foodestablishment (location, name, average_rating, userid)  VALUES
    ("123 Main Street",  "Tasty Burger Joint", 0, 2),
    ("456 Elm Avenue",   "Pizza Paradise",     0, 2),
    ("789 Oak Lane",     "Sushi Sensation",    0, 2),
    ("321 Mapl  e Road", "BBQ Bonanza",        0, 4),
    ("654 Pine Drive",   "Mexican Fiesta",     0, 4);

-- Food items for establishment id 1 ("123 Main Street", "Tasty Burger Joint")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Classic Cheeseburger", 9.99,  2, 1),
    ("Crispy Fries",         3.49,  2, 1),
    ("Milkshake",            4.99,  2, 1),
    ("Caesar Salad",         7.99,  2, 1),
    ("BBQ Bacon Burger",     11.99, 2, 1);

-- Food types for food items of establishment id 1
INSERT INTO foodtype (fooditemid, type) VALUES
    (1, "Burger"),
    (2, "American"),
    (3, "Side Dish"),
    (4, "Beverage"),
    (5, "BBQ");

-- Food items for establishment id 2 ("456 Elm Avenue", "Pizza Paradise")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Pepperoni Pizza",  12.99, 2, 2),
    ("Garlic Knots",     5.49,  2, 2),
    ("Tiramisu",         6.99,  2, 2),
    ("Greek Salad",      8.49,  2, 2),
    ("Margherita Pizza", 10.99, 2, 2);

-- Food types for food items of establishment id 2
INSERT INTO foodtype (fooditemid, type)
VALUES
    (6,  "Pizza"),
    (7,  "Italian"),
    (8,  "Appetizer"),
    (9,  "Dessert"),
    (10, "Salad");

-- Food items for establishment id 3 ("789 Oak Lane", "Sushi Sensation")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Sashimi Platter",     18.99, 2, 3),
    ("Miso Soup",           4.49,  2, 3),
    ("Green Tea Ice Cream", 5.99,  2, 3),
    ("Tempura Shrimp",      14.99, 2, 3),
    ("Dragon Roll",         16.99, 2, 3);

-- Food types for food items of establishment id 3
INSERT INTO foodtype (fooditemid, type) VALUES
    (11, "Sushi"),
    (12, "Japanese"),
    (13, "Soup"),
    (14, "Dessert"),
    (15, "Seafood");

-- Food items for establishment id 4 ("321 Maple Road", "BBQ Bonanza")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Smoked Ribs",          14.99, 4, 4),
    ("BBQ Chicken Wings",    9.49,  4, 4),
    ("Cornbread",            3.99,  4, 4),
    ("Pulled Pork Sandwich", 11.49, 4, 4),
    ("Brisket Platter",      16.99, 4, 4);

-- Food types for food items of establishment id 4
INSERT INTO foodtype (fooditemid, type) VALUES
    (16, "BBQ"),
    (17, "American"),
    (18, "Side Dish"),
    (19, "Sandwich"),
    (20, "Brisket");

-- Food items for establishment id 5 ("654 Pine Drive", "Mexican Fiesta")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Tacos al Pastor",     10.99, 4, 5),
    ("Guacamole and Chips", 6.49,  4, 5),
    ("Churros",             4.99,  4, 5),
    ("Enchiladas Verdes",   12.49, 4, 5),
    ("Carne Asada Burrito", 11.99, 4, 5);

-- Food types for food items of establishment id 5
INSERT INTO foodtype (fooditemid, type) VALUES
    (21, "Taco"),
    (22, "Mexican"),
    (23, "Appetizer"),
    (24, "Dessert"),
    (25, "Burrito");
