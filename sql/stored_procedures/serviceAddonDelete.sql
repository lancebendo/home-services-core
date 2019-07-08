DELIMITER $$

DROP PROCEDURE IF EXISTS serviceAddonDelete; $$

CREATE PROCEDURE serviceAddonDelete
(
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
			
	DELETE FROM service_addon
	WHERE service_id = _service_id AND addon_id = _addon_id;
	
END $$
