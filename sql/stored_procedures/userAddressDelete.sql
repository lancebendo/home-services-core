DELIMITER $$

DROP PROCEDURE IF EXISTS userAddressDelete; $$

CREATE PROCEDURE userAddressDelete
(
	IN _user_id INT,
	IN _address_id INT
)
BEGIN

	DELETE FROM user_address
	WHERE user_id = _user_id AND address_id = _address_id;
		
END $$