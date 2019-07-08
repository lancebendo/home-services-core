DELIMITER $$

DROP PROCEDURE IF EXISTS userAddressInsertOrUpdate; $$

CREATE PROCEDURE userAddressInsertOrUpdate 
(
	IN _user_id INT,
	IN _address_id INT,
	IN _is_default TINYINT
)
BEGIN

	IF (NOT EXISTS(SELECT * FROM user_address WHERE user_id = _user_id AND address_id = _address_id)) THEN
	
		INSERT INTO user_address 
			(user_id, address_id, is_default)
		VALUES 
			(_user_id, _address_id, _is_default);
		
	ELSE 
		UPDATE user_address SET is_default = _is_default WHERE user_id = _user_id AND address_id = _address_id;
	END IF;
		
END $$