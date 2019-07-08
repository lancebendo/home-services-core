DELIMITER $$

DROP PROCEDURE IF EXISTS completedSessionInsert; $$

CREATE PROCEDURE completedSessionInsert
(
	OUT _id INT,
	IN _reservation_id INT,
	IN _recurrency_number SMALLINT,
	IN _date DATE,
	IN _note VARCHAR(255)
)
BEGIN
	
	INSERT INTO completed_session
		(reservation_id, recurrency_number, date, note)
	VALUES 
		(_reservation_id, _recurrency_number, _date, _note);

	SELECT LAST_INSERT_ID() INTO _id;
	
END $$

