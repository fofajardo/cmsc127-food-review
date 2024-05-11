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