DELIMITER $$

DROP PROCEDURE IF EXISTS promoUpdate; $$

CREATE PROCEDURE promoUpdate 
(
	IN _id INT,
	IN _promo_domain VARCHAR(50), -- service, addon or promo
	IN _start_date DATE,
	IN _end_date DATE
)
BEGIN
	
	SET @statement = CONCAT('UPDATE ', _promo_domain, '_promo SET start_date='''
	, _start_date, ''', end_date=''', _end_date, ''' WHERE id=', _id, ';');
	
	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;
	
END $$

