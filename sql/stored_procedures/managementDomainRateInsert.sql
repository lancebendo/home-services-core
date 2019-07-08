DELIMITER $$

DROP PROCEDURE IF EXISTS managementDomainRateInsert; $$

CREATE PROCEDURE managementDomainRateInsert 
(
	OUT _id INT,
	IN _domain_id INT,
	IN _management_domain_type VARCHAR(50), -- service, addon or promo
	IN _rate VARCHAR(50),
	IN _operator SMALLINT,
	IN _by_percentage TINYINT
)
BEGIN
			
	IF (UPPER(_management_domain_type) LIKE UPPER('promo')) THEN
		
		-- PAG MAY NAUNA NA, UPDATE END DATE TO TODAY.
		UPDATE promo_rate 
		SET end_date = CONCAT('', CURDATE(), '') 
		WHERE end_date IS NULL;
		
		INSERT INTO promo_rate (promo_id, set_date, rate, operator, by_percentage) 
		VALUES (_domain_id, CONCAT('',CURDATE(), ''), _rate, _operator, _by_percentage);
	
	ELSE
	
		SET @statementUpdate = CONCAT('UPDATE ', _management_domain_type, '_rate SET end_date=''', 
										CURDATE(), ''' WHERE end_date IS NULL;');
	
		PREPARE queryUpdate FROM @statementUpdate;
		EXECUTE queryUpdate;
		DEALLOCATE PREPARE queryUpdate;
		
		SET @statementInsert = CONCAT('INSERT INTO ', _management_domain_type, '_rate (', _management_domain_type,
							'_id, set_date, rate) VALUES (', _domain_id, ', ''', CURDATE(), ''', ', _rate, ');');

		PREPARE queryInsert FROM @statementInsert;
		EXECUTE queryInsert;
		DEALLOCATE PREPARE queryInsert;
		
	END IF;
	
END $$

