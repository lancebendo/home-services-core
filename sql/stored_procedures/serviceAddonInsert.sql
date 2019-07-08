DELIMITER $$

DROP PROCEDURE IF EXISTS serviceAddonInsert; $$

CREATE PROCEDURE serviceAddonInsert 
(
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
			
	INSERT INTO service_addon (service_id, addon_id)
	VALUES (_service_id, _addon_id);
	
END $$
