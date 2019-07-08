DELIMITER $$

DROP PROCEDURE IF EXISTS serviceProviderUpdate; $$

CREATE PROCEDURE serviceProviderUpdate
(
	IN _id INT,
	IN _user_id INT,
	IN _start_date DATE,
	IN _end_date DATE
)
BEGIN
	
	UPDATE service_provider
	SET 
		start_date = _start_date, 
		end_date = _end_date
	WHERE id = _id AND user_id = _user_id;
	
END $$