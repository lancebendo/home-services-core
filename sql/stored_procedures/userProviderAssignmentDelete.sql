DELIMITER $$

DROP PROCEDURE IF EXISTS userProviderAssignmentDelete; $$

CREATE PROCEDURE userProviderAssignmentDelete
(
	IN _user_provider_id INT,
	IN _reservation_id INT,
	IN _recurrency_number TINYINT
)
BEGIN
	
	DELETE FROM user_provider_assignment
	WHERE user_provider_id = _user_provider_id 
	AND reservation_id = _reservation_id 
	AND recurrency_number = _recurrency_number;
	
END $$