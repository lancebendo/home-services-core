DELIMITER $$

DROP PROCEDURE IF EXISTS reservationInsert; $$

CREATE PROCEDURE reservationInsert
(
	OUT _id INT,
	IN _user_id INT,
	IN _address_id INT,
	IN _status INT,
	IN _initial_date DATE,
	IN _additional_note VARCHAR(255)
)
BEGIN
	
	INSERT INTO reservation
		(user_id, address_id, status, initial_date, additional_note)
	VALUES 
		(_user_id, _address_id, _status, _initial_date, _additional_note);

	SELECT LAST_INSERT_ID() INTO _id;
	
END $$

