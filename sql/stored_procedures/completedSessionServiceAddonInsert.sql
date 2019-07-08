DELIMITER $$

DROP PROCEDURE IF EXISTS completedSessionServiceAddonInsert; $$

CREATE PROCEDURE completedSessionServiceAddonInsert
(
	IN _completed_session_id INT,
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
	
	INSERT INTO completed_session_service_addon (completed_session_id, service_id, addon_id)
	VALUES (_completed_session_id, _service_id, addon_id); 
	
END $$
