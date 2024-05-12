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
    fooditemid INT NOT NULL,
    type VARCHAR(255) NOT NULL,
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

CREATE VIEW ratedfoodestablishment (foodestid, location, name, userid, average_rating) AS
    SELECT *, (
        SELECT AVG(rating)
        FROM review AS r
        WHERE r.foodestid=e.foodestid
    )
    FROM foodestablishment as e;

-- Users
INSERT INTO user (name, password, username, email, is_owner, is_end_user) VALUES
    ("Jose P. Rizal",       "password1234", "jpr1890",     "jpr@mudspring.uplb.edu.ph", 0, 1),
    ("Frank O. Wilco",      "password1234", "frankwilco",  "fow@mudspring.uplb.edu.ph", 1, 0),
    ("Saysay F. Ramon",     "password1234", "ramonsf",     "sfr@mudspring.uplb.edu.ph", 0, 1),
    ("William M. Saunders", "password1234", "williams21",  "wms@mudspring.uplb.edu.ph", 1, 0),
    ("Jane L. Ryan",        "password1234", "janeryan",    "jlr@mudspring.uplb.edu.ph", 0, 1);

-- Food establishments
INSERT INTO foodestablishment (location, name, userid)  VALUES
    ("123 Main Street", "Tasty Burger Joint", 2),
    ("456 Elm Avenue",  "Pizza Paradise",     2),
    ("789 Oak Lane",    "Sushi Sensation",    2),
    ("321 Maple Road",  "Naccao BBQ Bonanza", 4),
    ("654 Pine Drive",  "Mexican Fiesta",     4);

-- Food items and types for establishment id 1 ("123 Main Street", "Tasty Burger Joint")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Classic Cheeseburger", 9.99,  2, 1),
    ("Crispy Fries",         3.49,  2, 1),
    ("Milkshake",            4.99,  2, 1),
    ("Caesar Salad",         7.99,  2, 1),
    ("BBQ Bacon Burger",     11.99, 2, 1);
INSERT INTO foodtype (fooditemid, type) VALUES
    (1, "Burger"),
    (2, "Fries"),
    (3, "Side Dish"),
    (4, "Beverage"),
    (5, "BBQ"),
    (1, "American"),
    (2, "American"),
    (3, "American"),
    (4, "American"),
    (5, "American");

-- Food items and types for establishment id 2 ("456 Elm Avenue", "Pizza Paradise")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Pepperoni Pizza",  12.99, 2, 2),
    ("Garlic Knots",     5.49,  2, 2),
    ("Tiramisu",         6.99,  2, 2),
    ("Greek Salad",      8.49,  2, 2),
    ("Margherita Pizza", 10.99, 2, 2);
INSERT INTO foodtype (fooditemid, type) VALUES
    (6,  "Pizza"),
    (7,  "Side Dish"),
    (8,  "Appetizer"),
    (9,  "Dessert"),
    (10, "Salad"),
    (6, "Italian"),
    (7, "Italian"),
    (8, "Italian"),
    (9, "Italian"),
    (10, "Italian");

-- Food items and types for establishment id 3 ("789 Oak Lane", "Sushi Sensation")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Sashimi Platter",     18.99, 2, 3),
    ("Miso Soup",           4.49,  2, 3),
    ("Green Tea Ice Cream", 5.99,  2, 3),
    ("Tempura Shrimp",      14.99, 2, 3),
    ("Dragon Roll",         16.99, 2, 3);
INSERT INTO foodtype (fooditemid, type) VALUES
    (11, "Sushi"),
    (12, "Soup"),
    (13, "Ice Cream"),
    (14, "Dessert"),
    (15, "Seafood"),
    (11, "Japanese"),
    (12, "Japanese"),
    (13, "Japanese"),
    (14, "Japanese"),
    (15, "Japanese");

-- Food items and types for establishment id 4 ("321 Maple Road", "Naccao BBQ Bonanza")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Smoked Ribs",          14.99, 4, 4),
    ("BBQ Chicken Wings",    9.49,  4, 4),
    ("Cornbread",            3.99,  4, 4),
    ("Pulled Pork Sandwich", 11.49, 4, 4),
    ("Brisket Platter",      16.99, 4, 4);
INSERT INTO foodtype (fooditemid, type) VALUES
    (16, "BBQ"),
    (17, "BBQ"),
    (18, "Side Dish"),
    (19, "Sandwich"),
    (20, "Brisket"),
    (16, "American"),
    (17, "American"),
    (18, "American"),
    (19, "American"),
    (20, "American");

-- Food items and types for establishment id 5 ("654 Pine Drive", "Mexican Fiesta")
INSERT INTO fooditem (name, price, userid, foodestid) VALUES
    ("Tacos al Pastor",     10.99, 4, 5),
    ("Guacamole and Chips", 6.49,  4, 5),
    ("Churros",             4.99,  4, 5),
    ("Enchiladas Verdes",   12.49, 4, 5),
    ("Carne Asada Burrito", 11.99, 4, 5);
INSERT INTO foodtype (fooditemid, type) VALUES
    (21, "Taco"),
    (22, "Chips"),
    (23, "Appetizer"),
    (24, "Dessert"),
    (25, "Burrito"),
    (21, "Mexican"),
    (22, "Mexican"),
    (23, "Mexican"),
    (24, "Mexican"),
    (25, "Mexican");

-- Reviews for food establishments and items
INSERT INTO review (type, note, date, rating, userid, foodestid, fooditemid) VALUES
    ("food_item",
        "This burger was delicious! The patty was juicy and flavorful, and the toppings were fresh. The fries were also perfectly crispy. Highly recommend!",
        "2024-05-10",
        5.0,
        (SELECT userid FROM user WHERE username = "janeryan"),
        (SELECT foodestid FROM fooditem WHERE name = "Classic Cheeseburger"),
        (SELECT fooditemid FROM fooditem WHERE name = "Classic Cheeseburger")
    ),
    ("food_establishment",
        "This place is a hidden gem! The tacos are authentic and delicious, and the guacamole is some of the best I've ever had. The service was friendly and attentive. Will definitely be back!",
        "2024-04-20",
        5.0,
        (SELECT userid FROM user WHERE username = "janeryan"),
        (SELECT foodestid FROM foodestablishment WHERE name = "Mexican Fiesta"),
        NULL
    ),
    ("food_item",
        "The fish was incredibly fresh and flavorful. The presentation was beautiful, and the service was excellent. A bit pricey, but worth it for a special occasion.",
        "2024-05-03",
        4.0,
        (SELECT userid FROM user WHERE username = "janeryan"),
        (SELECT foodestid FROM fooditem WHERE name = "Sashimi Platter"),
        (SELECT fooditemid FROM fooditem WHERE name = "Sashimi Platter")
    ),
    ("food_establishment",
        "Great pizza place! The crust is thin and crispy, and the toppings are generous. We also tried the garlic knots, which were amazing. Definitely coming back!",
        "2024-05-08",
        4.5,
        (SELECT userid FROM user WHERE username = "ramonsf"),
        (SELECT foodestid FROM foodestablishment WHERE name = "Pizza Paradise"),
        NULL
    ),
    ("food_item",
        "The ribs were fall-off-the-bone tender and perfectly smoked. The BBQ sauce was delicious, and the sides were a great complement. A bit smoky inside, but the food is amazing!",
        "2024-04-27",
        4.5,
        (SELECT userid FROM user WHERE username = "ramonsf"),
        (SELECT foodestid FROM fooditem WHERE name = "Smoked Ribs"),
        (SELECT fooditemid FROM fooditem WHERE name = "Smoked Ribs")
    ),
    ("food_item",
        "A great burger option! The BBQ Bacon Burger is juicy and flavorful, with a delicious combination of BBQ sauce and bacon. The fries are crispy and perfect for dipping.",
        "2023-11-18",
        4.5,
        (SELECT userid FROM user WHERE username = "janeryan"),
        (SELECT foodestid FROM fooditem WHERE name = "BBQ Bacon Burger"),
        (SELECT fooditemid FROM fooditem WHERE name = "BBQ Bacon Burger")
    ),
    ("food_establishment",
        "This place is a favorite for wings! The BBQ Chicken Wings are always perfectly cooked and flavorful. The staff is friendly and the service is fast. Highly recommend!",
        "2023-10-21",
        5.0,
        (SELECT userid FROM user WHERE username = "janeryan"),
        (SELECT foodestid FROM foodestablishment WHERE name = "Naccao BBQ Bonanza"),
        NULL
    ),
    ("food_item",
        "Green Tea Ice Cream is a refreshing and delicious dessert! The perfect way to end a meal at Sushi Sensation.",
        "2023-09-09",
        4.0,
        (SELECT userid FROM user WHERE username = "ramonsf"),
        (SELECT foodestid FROM fooditem WHERE name = "Green Tea Ice Cream"),
        (SELECT fooditemid FROM fooditem WHERE name = "Green Tea Ice Cream")
    ),
    ("food_establishment",
        "Great spot for Mexican food! The tacos are delicious and authentic, and the service is friendly. A bit on the crowded side, but definitely worth the wait.",
        "2023-08-05",
        4.5,
        (SELECT userid FROM user WHERE username = "ramonsf"),
        (SELECT foodestid FROM foodestablishment WHERE name = "Mexican Fiesta"),
        NULL
    ),
    ("food_item",
        "Pulled Pork Sandwich is NOT a must-try at Naccao BBQ Bonanza! The pulled pork is tasteless, and the sandwich is just meh.",
        "2023-07-14",
        1.0,
        (SELECT userid FROM user WHERE username = "ramonsf"),
        (SELECT foodestid FROM fooditem WHERE name = "Pulled Pork Sandwich"),
        (SELECT fooditemid FROM fooditem WHERE name = "Pulled Pork Sandwich")
    ),
    ("food_item",
        "This Tiramisu is delicious! Light and flavorful, a perfect ending to a great meal.",
        "2024-03-12",
        4.5,
        (SELECT userid FROM user WHERE username = "janeryan"),
        (SELECT foodestid FROM fooditem WHERE name = "Tiramisu"),
        (SELECT fooditemid FROM fooditem WHERE name = "Tiramisu")
    ),
    ("food_establishment",
        "Had a great experience at Sushi Sensation! The staff was friendly and helpful, and the sushi was delicious. A bit on the pricey side, but definitely worth it.",
        "2024-02-10",
        4.0,
        (SELECT userid FROM user WHERE username = "janeryan"),
        (SELECT foodestid FROM foodestablishment WHERE name = "Sushi Sensation"),
        NULL
    ),
    ("food_item",
        "Miso soup is a must-try! Warm, flavorful, and the perfect appetizer. Definitely recommend!",
        "2024-03-05",
        4.0,
        (SELECT userid FROM user WHERE username = "jpr1890"),
        (SELECT foodestid FROM fooditem WHERE name = "Miso Soup"),
        (SELECT fooditemid FROM fooditem WHERE name = "Miso Soup")
    ),
    ("food_establishment",
        "I dislike this BBQ place! The staff is unfriendly and unhelpful.",
        "2024-01-25",
        1.0,
        (SELECT userid FROM user WHERE username = "jpr1890"),
        (SELECT foodestid FROM foodestablishment WHERE name = "Naccao BBQ Bonanza"),
        NULL
    ),
    ("food_item",
        "Classic and delicious! The Caesar salad is a great side dish or light meal. Fresh and flavorful!",
        "2023-12-10",
        4.0,
        (SELECT userid FROM user WHERE username = "jpr1890"),
        (SELECT foodestid FROM fooditem WHERE name = "Caesar Salad"),
        (SELECT fooditemid FROM fooditem WHERE name = "Caesar Salad")
    );
