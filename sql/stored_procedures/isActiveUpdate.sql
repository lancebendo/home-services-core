DELIMITER $$

DROP PROCEDURE IF EXISTS isActiveUpdate; $$

CREATE PROCEDURE isActiveUpdate
(
	IN _domain VARCHAR(20),
	IN _id INT,
	IN _is_active TINYINT
)
BEGIN
	SET @statement = CONCAT('UPDATE ', _domain, ' SET is_active = ', _is_active, ' WHERE id = ', _id);
	
	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;
	
END $$