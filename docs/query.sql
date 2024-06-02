DROP DATABASE IF EXISTS foodreview;
CREATE DATABASE foodreview;
USE foodreview;

-- Create database tables
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

-- Create view/s for relations with derived attributes
CREATE VIEW ratedfoodestablishment (foodestid, location, name, userid, average_rating) AS
    SELECT *, (
        SELECT AVG(rating)
        FROM review AS r
        WHERE r.foodestid=e.foodestid
    )
    FROM foodestablishment as e;

-- Create users
INSERT INTO user (name, password, username, email, is_owner, is_end_user) VALUES (?, ?, ?, ?, ?, ?);

-- Create food establishments
INSERT INTO foodestablishment (location, name, userid) VALUES (?, ?, ?);

-- Create food items and types for establishment
INSERT INTO fooditem (name, price, userid, foodestid) VALUES (?, ?, ?, ?);
INSERT INTO foodtype (fooditemid, type) VALUES (?, ?);

-- Create reviews for food establishments and items
INSERT INTO review (type, note, date, rating, userid, foodestid, fooditemid)
    VALUES (?, ?, ?, ?, 
        (SELECT userid FROM user WHERE username = ?), 
        (SELECT foodestid FROM fooditem WHERE name = ?), 
        (SELECT fooditemid FROM fooditem WHERE name = ?));

-- Search by food establishment id
-- SELECT * FROM foodestablishment WHERE foodestid = ?;

-- Search by food establishment location
-- SELECT * FROM foodestablishment WHERE foodestid = ?;

-- Search by food establishment name
-- SELECT foodestid FROM foodestablishment WHERE name LIKE ?;

-- Filter establishments by rating
-- SELECT * FROM ratedfoodestablishment WHERE average_rating BETWEEN ? AND ?;

-- Filter establishments by name
-- SELECT * FROM ratedfoodestablishment ORDER BY name ${order};

-- Search and filter establishments
SELECT * FROM ratedfoodestablishment
    WHERE name LIKE ? AND average_rating BETWEEN ? AND ?
    ORDER BY name ${orderBy};

-- Filter food items by establishment id
SELECT * FROM fooditem
    WHERE foodestid = ?
    ORDER BY 
        CASE
            WHEN ? = 'price_asc' THEN price
            WHEN ? = 'price_desc' THEN price DESC
            WHEN ? = 'name_asc' THEN name
            WHEN ? = 'name_desc' THEN name DESC
            ELSE price -- default
        END;