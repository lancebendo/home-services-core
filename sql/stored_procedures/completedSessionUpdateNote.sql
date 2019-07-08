DELIMITER $$

DROP PROCEDURE IF EXISTS completedSessionUpdateNote; $$

CREATE PROCEDURE completedSessionUpdateNote
(
	IN _id INT,
	IN _note VARCHAR(255)
)
BEGIN
	
	UPDATE completed_session
	SET note = _note
	WHERE id = _id;
	
END $$

