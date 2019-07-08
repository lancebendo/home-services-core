DELIMITER $$

DROP PROCEDURE IF EXISTS userAccessLevel_Insert; $$

CREATE PROCEDURE userAccessLevel_Insert 
(
	IN _user_id INT,
	
	-- user access levels
	IN _is_basic TINYINT,
	IN _is_provider TINYINT,
	IN _is_admin TINYINT
)
BEGIN

	IF _is_basic = 1 THEN
		INSERT INTO user_access_level (user_id, access_level_id)
		VALUES (_user_id, (SELECT id FROM access_level WHERE name = 'basic'));
	END IF;
	
	IF _is_provider = 1 THEN
		INSERT INTO user_access_level (user_id, access_level_id)
		VALUES (_user_id, (SELECT id FROM access_level WHERE name = 'provider'));
	END IF;
	
	IF _is_admin = 1 THEN
		INSERT INTO user_access_level (user_id, access_level_id)
		VALUES (_user_id, (SELECT id FROM access_level WHERE name = 'admin'));
	END IF;
		
END $$