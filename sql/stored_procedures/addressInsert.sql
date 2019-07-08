DELIMITER $$

DROP PROCEDURE IF EXISTS addressInsert; $$

CREATE PROCEDURE addressInsert 
(
	OUT _id INT,
	IN _province VARCHAR(50),
	IN _city VARCHAR(50),
	IN _barangay VARCHAR(50),
	IN _room_number VARCHAR(10),
	IN _bldg_number VARCHAR(10),
	IN _zip INT,
	IN _landmark VARCHAR(50)
)
BEGIN
	
	INSERT INTO address
		(province, city, barangay, room_number, bldg_number, zip, landmark)
	VALUES 
		(_province, _city, _barangay, _room_number, _bldg_number, _zip, _landmark);

	SELECT LAST_INSERT_ID() INTO _id;
	
END $$

