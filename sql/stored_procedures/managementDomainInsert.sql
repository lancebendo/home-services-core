DELIMITER $$

DROP PROCEDURE IF EXISTS managementDomainInsert; $$

CREATE PROCEDURE managementDomainInsert 
(
	OUT _id INT,
	IN _management_domain_type VARCHAR(50), -- service, addon or promo
	IN _name VARCHAR(50),
	IN _description VARCHAR(50)
)
BEGIN
	
	SET @statement = CONCAT('INSERT INTO ', _management_domain_type, ' (name, description) VALUES (''',
							_name, ''', ''', _description, ''');');

	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;

	SELECT LAST_INSERT_ID() INTO _id;
	
END $$

