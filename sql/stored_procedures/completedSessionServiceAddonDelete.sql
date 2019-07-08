DELIMITER $$

DROP PROCEDURE IF EXISTS completedSessionServiceAddonDelete; $$

CREATE PROCEDURE completedSessionAddonDelete
(
	IN _completed_session_id INT,
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
	
	IF (_addon_id IS NULL) THEN
		DELETE FROM completed_session_service_addon 
		WHERE completed_session_id = _completed_session_id AND service_id = _service_id;
	
	ELSE
		DELETE FROM completed_session_service_addon
		WHERE completed_session_id = _completed_session_id 
			  AND service_id = _service_id 
			  AND addon_id = _addon_id;
	
	END IF;
	
END $$
