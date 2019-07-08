DELIMITER $$

DROP PROCEDURE IF EXISTS userUpdate; $$

CREATE PROCEDURE userUpdate 
(
	IN _id INT,
	IN _firstname VARCHAR(50),
	IN _lastname VARCHAR(50),
	IN _date_of_birth DATE,
	IN _gender TINYINT,
	IN _email VARCHAR(50), 
	IN _contact_number VARCHAR(50)
)
BEGIN

	UPDATE user
	SET 
		firstname = _firstname, 
		lastname = _lastname, 
		date_of_birth = _date_of_birth, 
		gender = _gender, 
		email = _email, 
		contact_number = _contact_number
	WHERE id = _id;
	
END $$