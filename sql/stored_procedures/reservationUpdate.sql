DELIMITER $$

DROP PROCEDURE IF EXISTS reservationUpdate; $$

CREATE PROCEDURE reservationUpdate
(
	IN _id INT,
	IN _address_id INT,
	IN _status INT,
	IN _initial_date DATE,
	IN _additional_note VARCHAR(255)
)
BEGIN
	
	UPDATE reservation
	SET 
		address_id = _address_id, 
		status = _status, 
		initial_date = _initial_date, 
		additional_note = _additional_note
	WHERE id = _id;
	
END $$

