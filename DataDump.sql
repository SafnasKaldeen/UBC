DROP TABLE IF EXISTS admins;
CREATE TABLE `admins` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Full_Name` varchar(45) NOT NULL,
  `University` varchar(45) NOT NULL,
  `Age` int NOT NULL,
  `Phone_Number` bigint NOT NULL,
  `Email_Address` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS biology;
CREATE TABLE `biology` (
  `S.No` int NOT NULL AUTO_INCREMENT,
  `Material_Type` text NOT NULL,
  `Title` text NOT NULL,
  `Author` text NOT NULL,
  `Reference_Number` text NOT NULL,
  `Availablity` varchar(20) NOT NULL DEFAULT 'Available',
  PRIMARY KEY (`S.No`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS borrow;
CREATE TABLE `borrow` (
  `BorrowID` int NOT NULL AUTO_INCREMENT,
  `Reference_Number` varchar(45) NOT NULL,
  `BorrowerID` varchar(45) NOT NULL,
  `Borrowed_Date` datetime DEFAULT NULL,
  `Deadline` timestamp NULL DEFAULT NULL,
  `Availablity` varchar(20) NOT NULL DEFAULT 'Available',
  `Returned_Date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`BorrowID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS chemistry;
CREATE TABLE `chemistry` (
  `S.No` int NOT NULL AUTO_INCREMENT,
  `Material_Type` text NOT NULL,
  `Title` text NOT NULL,
  `Author` text NOT NULL,
  `Reference_Number` text NOT NULL,
  `Availablity` varchar(20) NOT NULL DEFAULT 'Available',
  PRIMARY KEY (`S.No`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS maths;
CREATE TABLE `maths` (
  `S.No` int NOT NULL AUTO_INCREMENT,
  `Material_Type` text NOT NULL,
  `Title` text NOT NULL,
  `Author` text NOT NULL,
  `Reference_Number` text NOT NULL,
  `Availablity` varchar(15) NOT NULL DEFAULT 'Available',
  PRIMARY KEY (`S.No`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS physics;
CREATE TABLE `physics` (
  `S.No` int NOT NULL AUTO_INCREMENT,
  `Material_Type` text NOT NULL,
  `Title` text NOT NULL,
  `Author` text NOT NULL,
  `Reference_Number` text NOT NULL,
  `Availablity` varchar(15) NOT NULL DEFAULT 'Available',
  PRIMARY KEY (`S.No`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `Full_Name` text,
  `Name_with_Initials` text NOT NULL,
  `Address` text NOT NULL,
  `School` text NOT NULL,
  `NIC_number` bigint NOT NULL,
  `Contact_Number` bigint NOT NULL,
  `Whatsapp_Number` bigint NOT NULL,
  `Scanned copy of National Identity Card (Front side)
(Image/pdf)` blob,
  `Scanned copy of National Identity Card (Back side)
(Image/pdf)` blob,
  `Email_Address` text NOT NULL,
  `Membership_ID` text NOT NULL,
  PRIMARY KEY (`Membership_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE OR REPLACE VIEW `admin` AS select `admins`.`Email_Address` AS `Email_Address`,`admins`.`Password` AS `Password` from `admins`;

CREATE OR REPLACE VIEW `user` AS select `users`.`Email_Address` AS `Email_Address`,`users`.`Membership_ID` AS `Membership_ID` from `users`;

INSERT INTO admins(ID,Full_Name,University,Age,Phone_Number,Email_Address,Password) VALUES('1','Kaldeen Mohamed Safnas','UOM','22','755354830','safnasthegreat@gmail.com','safnascool'),('2','Muhammathu Sanoon Abdullah Sudhes','UOP','20','762149373','abdullahsudhess@gmail.com','rSudhesMSA'),('3','Mohamed Ashhar Mohamed Alfar Safni','SEUSL','21','779182233','Safnialfar@gmail.com','Safni1234');

DROP PROCEDURE IF EXISTS Add_Admin;
CREATE PROCEDURE `Add_Admin`(
    IN email VARCHAR(100),
    IN password VARCHAR(100),
    IN fname VARCHAR(100),
    IN Uni VARCHAR(100),
    IN Age INT(3),
    IN Phone_No VARCHAR(15)
)
BEGIN
    INSERT INTO admins(Full_Name , Email_Address , Password , University , Age , Phone_Number)
    VALUES (fname , email , password , Uni , Age , Phone_No);
END;

DROP PROCEDURE IF EXISTS Add_Bio_Material;
CREATE PROCEDURE `Add_Bio_Material`(
    IN Material_Type VARCHAR(20),
    IN Title VARCHAR(100),
    IN Author VARCHAR(100),
    IN Reference_Number VARCHAR(20)
)
BEGIN
    INSERT INTO biology(Material_Type, Title, Author, Reference_Number)
    VALUES (Material_Type, Title, Author, Reference_Number);
END;

DROP PROCEDURE IF EXISTS Add_Borrow_Details;
CREATE PROCEDURE `Add_Borrow_Details`(
    IN Reference_Number VARCHAR(20),
    IN BorrowerID VARCHAR(20)
)
BEGIN
    INSERT INTO borrow (Reference_Number, BorrowerID)
    VALUES (Reference_Number, BorrowerID);
END;

DROP PROCEDURE IF EXISTS Add_Chemistry_Material;
CREATE PROCEDURE `Add_Chemistry_Material`(
    IN Material_Type VARCHAR(20),
    IN Title VARCHAR(100),
    IN Author VARCHAR(100),
    IN Reference_Number VARCHAR(20)
)
BEGIN
    INSERT INTO chemistry(Material_Type, Title, Author, Reference_Number)
    VALUES (Material_Type, Title, Author, Reference_Number);
END;

DROP PROCEDURE IF EXISTS Add_Maths_Material;
CREATE PROCEDURE `Add_Maths_Material`(
    IN Material_Type VARCHAR(20),
    IN Title VARCHAR(100),
    IN Author VARCHAR(100),
    IN Reference_Number VARCHAR(20)
)
BEGIN
    INSERT INTO maths(Material_Type, Title, Author, Reference_Number)
    VALUES (Material_Type, Title, Author, Reference_Number);
END;

DROP PROCEDURE IF EXISTS Add_Physics_Material;
CREATE PROCEDURE `Add_Physics_Material`(
    IN Material_Type VARCHAR(20),
    IN Title VARCHAR(100),
    IN Author VARCHAR(100),
    IN Reference_Number VARCHAR(20)
)
BEGIN
    INSERT INTO physics(Material_Type, Title, Author, Reference_Number)
    VALUES (Material_Type, Title, Author, Reference_Number);
END;

DROP PROCEDURE IF EXISTS Add_User;
CREATE PROCEDURE `Add_User`(
  IN Full_Name VARCHAR(100),
  IN Name_with_Initials VARCHAR(50),
  IN Email VARCHAR(100),
  IN Contact_Number VARCHAR(15),
  IN Whatsapp_Number VARCHAR(15),
  IN NIC_Number BIGINT(12),
  IN Address VARCHAR(200),
  IN School VARCHAR(100),
  IN ID VARCHAR(10))
BEGIN
    INSERT INTO users(Full_Name, Name_with_Initials, Email_Address, Contact_Number, Whatsapp_Number, NIC_Number, Address, School , Membership_ID) 
    VALUES (Full_Name , Name_with_Initials , Email , Contact_Number , Whatsapp_Number , NIC_Number , Address , School , ID);
END;

DROP PROCEDURE IF EXISTS Delete_Bio_Material;
CREATE PROCEDURE `Delete_Bio_Material`(
    IN p_Reference_Number varchar(25)
)
BEGIN
    DELETE FROM biology
    WHERE Reference_Number = p_Reference_Number;
END;

DROP PROCEDURE IF EXISTS Delete_Chemistry_Material;
CREATE PROCEDURE `Delete_Chemistry_Material`(
    IN p_Reference_Number varchar(15)
)
BEGIN
    DELETE FROM chemistry
    WHERE Reference_Number = p_Reference_Number;
END;

DROP PROCEDURE IF EXISTS Delete_Maths_Material;
CREATE PROCEDURE `Delete_Maths_Material`(
    IN p_Reference_Number varchar(15)
)
BEGIN
    DELETE FROM maths
    WHERE Reference_Number = p_Reference_Number;
END;

DROP PROCEDURE IF EXISTS Delete_Physics_Material;
CREATE PROCEDURE `Delete_Physics_Material`(
    IN p_Reference_Number varchar(15)
)
BEGIN
    DELETE FROM physics
    WHERE Reference_Number = p_Reference_Number;
END;

DROP PROCEDURE IF EXISTS Edit_Bio_Material;
CREATE PROCEDURE `Edit_Bio_Material`(
    IN p_Material_Type VARCHAR(20),
    IN p_Title VARCHAR(100),
    IN p_Author VARCHAR(100),
    IN p_Reference_Number VARCHAR(20)
)
BEGIN
    UPDATE biology
    SET Material_Type = p_Material_Type,
        Title = p_Title,
        Author = p_Author
    WHERE Reference_Number = p_Reference_Number;
END;

DROP PROCEDURE IF EXISTS Edit_Chemistry_Material;
CREATE PROCEDURE `Edit_Chemistry_Material`(
    IN p_Material_Type VARCHAR(20),
    IN p_Title VARCHAR(100),
    IN p_Author VARCHAR(100),
    IN p_Reference_Number VARCHAR(20)
)
BEGIN
    UPDATE chemistry
    SET Material_Type = p_Material_Type,
        Title = p_Title,
        Author = p_Author
    WHERE Reference_Number = p_Reference_Number;
END;

DROP PROCEDURE IF EXISTS Edit_Maths_Material;
CREATE PROCEDURE `Edit_Maths_Material`(
    IN p_Material_Type VARCHAR(20),
    IN p_Title VARCHAR(100),
    IN p_Author VARCHAR(100),
    IN p_Reference_Number VARCHAR(20)
)
BEGIN
    UPDATE maths
    SET Material_Type = p_Material_Type,
        Title = p_Title,
        Author = p_Author
    WHERE Reference_Number = p_Reference_Number;
END;

DROP PROCEDURE IF EXISTS Edit_Physics_Material;
CREATE PROCEDURE `Edit_Physics_Material`(
    IN p_Material_Type VARCHAR(20),
    IN p_Title VARCHAR(100),
    IN p_Author VARCHAR(100),
    IN p_Reference_Number VARCHAR(20)
)
BEGIN
    UPDATE physics
    SET Material_Type = p_Material_Type,
        Title = p_Title,
        Author = p_Author
    WHERE Reference_Number = p_Reference_Number;
END;

