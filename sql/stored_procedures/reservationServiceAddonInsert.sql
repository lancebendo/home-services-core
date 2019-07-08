DELIMITER $$

DROP PROCEDURE IF EXISTS reservationServiceAddonInsert; $$

CREATE PROCEDURE reservationAddonInsert
(
	IN _reservation_id INT,
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
	
	INSERT INTO reservation_service_addon (reservation_id, service_id, addon_id)
	VALUES (_reservation_id, _service_id, addon_id); 
	
END $$
