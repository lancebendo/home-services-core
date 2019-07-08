DELIMITER $$

DROP PROCEDURE IF EXISTS userInsert; $$

CREATE PROCEDURE userInsert 
(
	OUT _id INT,
	IN _firstname VARCHAR(50),
	IN _lastname VARCHAR(50),
	IN _date_of_birth DATE,
	IN _gender TINYINT,
	IN _email VARCHAR(50),
	IN _contact_number VARCHAR(50)
)
BEGIN

	INSERT INTO user
		(firstname, lastname, date_of_birth, gender, email, contact_number)
	VALUES 
		(_firstname, _lastname, _date_of_birth, _gender, _email, _contact_number);
		
	SELECT LAST_INSERT_ID() INTO _id;
	
END $$