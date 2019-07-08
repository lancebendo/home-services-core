DELIMITER $$

DROP PROCEDURE IF EXISTS promoDelete; $$

CREATE PROCEDURE promoDelete
(
	IN _id INT,
	IN _promo_domain VARCHAR(50) -- service, addon or promo
)
BEGIN
	
	SET @statement = CONCAT('DELETE FROM ', _promo_domain, '_promo WHERE id='
	, _id, ';');
	
	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;
	
END $$

