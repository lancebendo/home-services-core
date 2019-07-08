DELIMITER $$

DROP PROCEDURE IF EXISTS serviceProviderInsert; $$

CREATE PROCEDURE serviceProviderInsert
(
	OUT _id INT,
	IN _user_id INT,
	IN _start_date DATE
)
BEGIN
	
	INSERT INTO service_provider (user_id, start_date)
	VALUES (_user_id, _start_date);
		
	SELECT LAST_INSERT_ID() INTO _id;
	
END $$