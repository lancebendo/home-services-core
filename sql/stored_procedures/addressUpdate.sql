DELIMITER $$

DROP PROCEDURE IF EXISTS addressUpdate; $$

CREATE PROCEDURE addressUpdate 
(
	in _id INT,
	IN _province VARCHAR(50),
	IN _city VARCHAR(50),
	IN _barangay VARCHAR(50),
	IN _room_number VARCHAR(10),
	IN _bldg_number VARCHAR(10),
	IN _zip INT,
	IN _landmark VARCHAR(50)
)
BEGIN
	
	UPDATE address
	SET
		province = _province,
		city = _city,
		barangay = _barangay,
		room_number = _room_number,
		bldg_number = _bldg_number,
		zip = _zip,
		landmark = _landmark
	WHERE id = _id;
	
END $$

