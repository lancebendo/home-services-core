DELIMITER $$

DROP PROCEDURE IF EXISTS promoApply; $$

CREATE PROCEDURE promoApply 
(
	OUT _id INT,
	IN _promo_domain VARCHAR(50), -- service, addon or promo
	IN _promo_domain_id VARCHAR(50),
	IN _promo_id VARCHAR(50),
	IN _start_date DATE,
	IN _end_date DATE
)
BEGIN
	
	SET @statement = CONCAT('INSERT INTO ', _promo_domain, '_promo (',
							_promo_domain, '_id, promo_id, start_date, end_date) VALUES (',
							_promo_domain_id, ', ', _promo_id, ', ''', _start_date, ''', ''', _end_date, ''');' );
	
	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;
	
	SELECT LAST_INSERT_ID() INTO _id;
	
END $$

