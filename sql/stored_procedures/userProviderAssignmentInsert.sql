DELIMITER $$

DROP PROCEDURE IF EXISTS userProviderAssignmentInsert; $$

CREATE PROCEDURE userProviderAssignmentInsert
(
	IN _user_provider_id INT,
	IN _reservation_id INT,
	IN _recurrency_number TINYINT
)
BEGIN

	INSERT INTO user_provider_assignment (user_provider_id, reservation_id, recurrency_number)
	VALUES (_user_provider_id, reservation_id, recurrency_number);
	
END $$