DELIMITER $$

DROP PROCEDURE IF EXISTS managementDomainUpdate; $$

CREATE PROCEDURE managementDomainUpdate 
(
	IN _id INT,
	IN _management_domain_type VARCHAR(50), -- service, addon or promo
	IN _name VARCHAR(50),
	IN _description VARCHAR(50)
)
BEGIN
	
	SET @statement = CONCAT('UPDATE ', _management_domain_type, ' SET name=''',
							_name, ''', description=''', _description, ''' WHERE id=', _id);
	
	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;
	
END $$

