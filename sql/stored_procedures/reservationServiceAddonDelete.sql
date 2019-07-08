DELIMITER $$

DROP PROCEDURE IF EXISTS reservationServiceAddonDelete; $$

CREATE PROCEDURE reservationAddonDelete
(
	IN _reservation_id INT,
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
	
	IF (_addon_id IS NULL) THEN
		DELETE FROM reservation_service_addon 
		WHERE reservation_id = _reservation_id AND service_id = _service_id;
	
	ELSE
		DELETE FROM reservation_service_addon
		WHERE reservation_id = _reservation_id 
			  AND service_id = _service_id 
			  AND addon_id = _addon_id;
	
	END IF;
	
END $$
