-- FEATURES
-- 1. Add, update, and delete a food review (on a food establishment or a food item)
    -- a. Add a review
    INSERT INTO review (type, note, date, rating, userid, foodestid, fooditemid) 
    VALUES ('type', 'note', '1111-11-11', 1.1, 1, 1, 1);
    -- b. Update a review
    UPDATE review -- only details can be updated
    SET type = 'type', note = 'note', date = '1111-11-11', rating = 1.1
    WHERE reviewid = 12345678900;
    -- c. Delete a review
    DELETE FROM review WHERE reviewid = 12345678900;

-- 2. Add, delete, search, and update a food establishment;
    -- a. Add foodestablishment
    INSERT INTO foodestablishment (location, name, average_rating, userid)
    VALUES ('location', 'name', 1.1, 12345678900);
    -- b. Update foodestablishment
    UPDATE foodestablishment -- only details can be updated
    SET location = 'location', name = 'name', average_rating = 1.1
    WHERE foodestid = 12345678900;
    -- c. Search foodestablishment
        -- i. Get all details of food establishment given id
        SELECT * 
        FROM foodestablishment
        WHERE foodestid = 1234567890;
        -- ii. Search by location
        SELECT foodestid
        FROM foodestablishment
        WHERE location = 'location';
        -- iii. Search by name
        SELECT foodestid
        FROM foodestablishment;
        WHERE name = 'name'
        -- iv. Search by average rating (minimum)
        SELECT foodestid
        FROM foodestablishment
        WHERE average_rating >= 1.1;
        -- v. Search by average rating (range)
        SELECT foodestid
        FROM foodestablishment
        WHERE average_rating >= 1 AND average_rating <= 5;
    -- d. Delete foodestablishment
    DELETE FROM foodestablishment
    WHERE foodestid = 12345678900;

-- 3. Add, delete, search, and update a food item.
    -- a. Add fooditem
    INSERT INTO fooditem (name, price, userid, foodestid)
    VALUES ('name', 1.1, 12345678900, 12345678900);
    -- b. Update fooditem
    UPDATE fooditem -- only details can be updated
    SET name = 'name', price = 1.1
    WHERE fooditemid = 12345678900;
    -- c. Search fooditem
        -- i. Get all details of food item given id
        SELECT * 
        FROM fooditem
        WHERE fooditemid = 1234567890;
        -- ii. Search by name
        SELECT fooditemid
        FROM fooditem
        WHERE name = 'name';
        -- iii. Search by price (minimum)
        SELECT fooditemid
        FROM fooditem
        WHERE price >= 0;
        -- iv. Search by price (range)
        SELECT fooditemid
        FROM fooditem
        WHERE price >= 0 AND price <= 1000;
    -- d. Delete fooditem
    DELETE FROM fooditem
    WHERE fooditemid = 12345678900;

-- REPORTS TO BE GENERATED
-- 1. View all food establishments;
    SELECT * FROM foodestablishment;
-- 2. View all food reviews for an establishment or a food item;
    SELECT * FROM review
    WHERE foodestid = 12345678900
    AND fooditemid IS NOT NULL; -- review of food items of the establishment
-- 3. View all food items from an establishment;
    SELECT * FROM fooditem
    WHERE foodestid = 12345678900;
-- 4. View all food items from an establishment that belong to a food type {meat | veg | etc.};
    SELECT * FROM fooditem AS i NATURAL JOIN foodtype AS t
    WHERE i.foodestid = 12345678900
    AND t.type IN ('meat', 'veg', 'etc');
-- 5. View all reviews made within a month for an establishment or a food item;
    -- a. Get all reviews made within a month for an establishment
    SELECT * FROM review
    WHERE foodestid = 12345678900
    AND date LIKE "1111-11%"
    -- b. Get all reviews made within a month for a food item
    SELECT * FROM review
    WHERE fooditemid = 12345678900
    AND date LIKE "1111-11%";
-- 6. View all establishments with a high average rating (rating >= 4). (ratings from 1-5; highest is5);
    SELECT * FROM foodestablishment
    WHERE average_rating >= 4;
-- 7. View all food items from an establishment arranged according to price;
    SELECT * FROM fooditem
    WHERE foodestid = 12345678900
    ORDER BY price;
-- 8. Search food items from any establishment based on a given price range and/or food type.
    -- a. Price range only
    SELECT * FROM fooditem AS i NATURAL JOIN foodtype AS t
    WHERE i.price >= 0 AND i.price <= 1000;
    -- b. Food type only
    SELECT * FROM fooditem AS i NATURAL JOIN foodtype AS t
    WHERE t.type IN ('meat', 'veg', 'etc');
    -- c. Price range and food type
    SELECT * FROM fooditem AS i NATURAL JOIN foodtype AS t
    WHERE i.price >= 0 AND i.price <= 1000
    AND t.type IN ('meat', 'veg', 'etc');
