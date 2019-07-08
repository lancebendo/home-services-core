DELIMITER $$

DROP PROCEDURE IF EXISTS userAccessLevelUpdate; $$

CREATE PROCEDURE userAccessLevelUpdate
(
	IN _user_id INT,
	
	-- user access levels
	IN _is_basic TINYINT,
	IN _is_provider TINYINT,
	IN _is_admin TINYINT
)
BEGIN

	DECLARE basic_access_level_id INT UNSIGNED DEFAULT (SELECT id FROM access_level WHERE name = 'basic');
	DECLARE provider_access_level_id INT UNSIGNED DEFAULT (SELECT id FROM access_level WHERE name = 'provider');
	DECLARE admin_access_level_id INT UNSIGNED DEFAULT (SELECT id FROM access_level WHERE name = 'admin');
	
	IF _is_basic = 1 THEN
		INSERT IGNORE INTO user_access_level (user_id, access_level_id)
		VALUES (_user_id, basic_access_level_id);	
	ELSE 
		DELETE FROM user_access_level WHERE user_id = _user_id AND access_level_id = basic_access_level_id;
	END IF;
	
	IF _is_provider = 1 THEN
		INSERT IGNORE INTO user_access_level (user_id, access_level_id)
		VALUES (_user_id, provider_access_level_id);
	ELSE 
		DELETE FROM user_access_level WHERE user_id = _user_id AND access_level_id = provider_access_level_id;
	END IF;
	
	IF _is_admin = 1 THEN
		INSERT IGNORE INTO user_access_level (user_id, access_level_id)
		VALUES (_user_id, admin_access_level_id);
	ELSE 
		DELETE FROM user_access_level WHERE user_id = _user_id AND access_level_id = admin_access_level_id;
	END IF;
		
END $$