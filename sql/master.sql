------ USERS ------

DROP USER IF EXISTS 'readonly_hs_user'@'%'; 

CREATE USER 'readonly_hs_user'@'%' 
IDENTIFIED BY 'password';

GRANT SELECT ON home_services.*
TO 'readonly_hs_user'@'%'
WITH GRANT OPTION;


DROP USER IF EXISTS 'writer_hs_user'@'%';

CREATE USER 'writer_hs_user'@'%' 
IDENTIFIED BY 'password';

GRANT INSERT, 
UPDATE, DELETE, 
EXECUTE ON home_services.*
 TO 'writer_hs_user'@'%' 
 WITH GRANT OPTION;



------ TABLES ---------------

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema home_services
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema home_services
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `home_services` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `home_services` ;

-- -----------------------------------------------------
-- Table `home_services`.`access_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`access_level` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  UNIQUE INDEX `constr_name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`addon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`addon` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `is_active` TINYINT(3) UNSIGNED NOT NULL DEFAULT '1',
  `created_date` DATETIME NULL DEFAULT NULL,
  `last_updated_date` DATETIME NULL DEFAULT NULL,
  `deleted_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`addon_launch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`addon_launch` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `addon_id` INT(11) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `is_ended` TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fkIdx_166` (`addon_id` ASC) VISIBLE,
  CONSTRAINT `FK_addon_addon_launch`
    FOREIGN KEY (`addon_id`)
    REFERENCES `home_services`.`addon` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`addon_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`addon_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `addon_id` INT(11) NULL DEFAULT NULL,
  `date_time` DATETIME NULL DEFAULT NULL,
  `info` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_159` (`addon_id` ASC) VISIBLE,
  CONSTRAINT `FK_addon_addon_log`
    FOREIGN KEY (`addon_id`)
    REFERENCES `home_services`.`addon` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`promo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`promo` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `is_active` TINYINT(3) UNSIGNED NOT NULL DEFAULT '1',
  `created_date` DATETIME NULL DEFAULT NULL,
  `last_updated_date` DATETIME NULL DEFAULT NULL,
  `deleted_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`addon_promo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`addon_promo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `addon_id` INT(11) NULL DEFAULT NULL,
  `promo_id` INT(11) NULL DEFAULT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_187` (`promo_id` ASC) VISIBLE,
  INDEX `fkIdx_193` (`addon_id` ASC) VISIBLE,
  CONSTRAINT `FK_addon_addon_promo`
    FOREIGN KEY (`addon_id`)
    REFERENCES `home_services`.`addon` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_promo_addon_promo`
    FOREIGN KEY (`promo_id`)
    REFERENCES `home_services`.`promo` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`addon_rate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`addon_rate` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `addon_id` INT(11) NULL DEFAULT NULL,
  `set_date` DATE NULL DEFAULT NULL,
  `last_date` DATE NULL DEFAULT NULL,
  `rate` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_152` (`addon_id` ASC) VISIBLE,
  CONSTRAINT `FK_addon_addon_rate`
    FOREIGN KEY (`addon_id`)
    REFERENCES `home_services`.`addon` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`address` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `province` VARCHAR(50) NULL DEFAULT NULL,
  `city` VARCHAR(50) NULL DEFAULT NULL,
  `barangay` VARCHAR(50) NULL DEFAULT NULL,
  `room_number` VARCHAR(10) NULL DEFAULT NULL,
  `bldg_number` VARCHAR(10) NULL DEFAULT NULL,
  `zip` INT(11) NULL DEFAULT NULL,
  `landmark` VARCHAR(50) NULL DEFAULT NULL,
  `is_active` TINYINT(3) UNSIGNED NOT NULL DEFAULT '1',
  `created_date` DATETIME NULL DEFAULT NULL,
  `last_updated_date` DATETIME NULL DEFAULT NULL,
  `deleted_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`address_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`address_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `address_id` INT(11) NULL DEFAULT NULL,
  `date_time` DATETIME NULL DEFAULT NULL,
  `info` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_93` (`address_id` ASC) VISIBLE,
  CONSTRAINT `FK_address_address_logs`
    FOREIGN KEY (`address_id`)
    REFERENCES `home_services`.`address` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(50) NULL DEFAULT NULL,
  `lastname` VARCHAR(50) NULL DEFAULT NULL,
  `date_of_birth` DATE NULL DEFAULT NULL,
  `gender` TINYINT(3) UNSIGNED NOT NULL DEFAULT '1',
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `contact_number` VARCHAR(50) NULL DEFAULT NULL,
  `is_active` TINYINT(3) UNSIGNED NOT NULL DEFAULT '1',
  `created_date` DATETIME NULL DEFAULT NULL,
  `last_updated_date` DATETIME NULL DEFAULT NULL,
  `deleted_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `constr_email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`reservation` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NULL DEFAULT NULL,
  `address_id` INT(11) NULL DEFAULT NULL,
  `status` INT(11) NOT NULL DEFAULT '0',
  `initial_date` DATE NULL DEFAULT NULL,
  `additional_note` VARCHAR(255) NULL DEFAULT NULL,
  `is_active` TINYINT(3) UNSIGNED NOT NULL DEFAULT '1',
  `created_date` DATETIME NULL DEFAULT NULL,
  `last_updated_date` DATETIME NULL DEFAULT NULL,
  `deleted_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_224` (`address_id` ASC) VISIBLE,
  INDEX `fkIdx_229` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_address_reservation`
    FOREIGN KEY (`address_id`)
    REFERENCES `home_services`.`address` (`id`)
    ON DELETE SET NULL,
  CONSTRAINT `FK_user_reservation`
    FOREIGN KEY (`user_id`)
    REFERENCES `home_services`.`user` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`completed_session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`completed_session` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `reservation_id` INT(11) NULL DEFAULT NULL,
  `recurrency_number` SMALLINT(6) NOT NULL DEFAULT '1',
  `date` DATE NULL DEFAULT NULL,
  `note` VARCHAR(255) NULL DEFAULT NULL,
  `created_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_259` (`reservation_id` ASC) VISIBLE,
  CONSTRAINT `FK_reservation_completed_session`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `home_services`.`reservation` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`service` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `is_active` TINYINT(3) UNSIGNED NOT NULL DEFAULT '1',
  `created_date` DATETIME NULL DEFAULT NULL,
  `last_updated_date` DATETIME NULL DEFAULT NULL,
  `deleted_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`completed_session_service_addon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`completed_session_service_addon` (
  `completed_session_id` INT(11) NOT NULL,
  `service_id` INT(11) NOT NULL,
  `addon_id` INT(11) NOT NULL,
  PRIMARY KEY (`completed_session_id`, `service_id`, `addon_id`),
  INDEX `fkIdx_263` (`completed_session_id` ASC) VISIBLE,
  INDEX `fkIdx_267` (`service_id` ASC) VISIBLE,
  INDEX `fkIdx_270` (`addon_id` ASC) VISIBLE,
  CONSTRAINT `FK_addon_completed_session_service_addon`
    FOREIGN KEY (`addon_id`)
    REFERENCES `home_services`.`addon` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_completed_session_completed_session_service_addon`
    FOREIGN KEY (`completed_session_id`)
    REFERENCES `home_services`.`completed_session` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_service_completed_session_service_addon`
    FOREIGN KEY (`service_id`)
    REFERENCES `home_services`.`service` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`invoice_snapshot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`invoice_snapshot` (
  `id` INT(11) NOT NULL,
  `snapshot` JSON NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `created_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`promo_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`promo_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `promo_id` INT(11) NULL DEFAULT NULL,
  `date_time` DATETIME NULL DEFAULT NULL,
  `info` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_218` (`promo_id` ASC) VISIBLE,
  CONSTRAINT `FK_promo_promo_log`
    FOREIGN KEY (`promo_id`)
    REFERENCES `home_services`.`promo` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`promo_rate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`promo_rate` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `promo_id` INT(11) NULL DEFAULT NULL,
  `set_date` DATE NULL DEFAULT NULL,
  `last_date` DATE NULL DEFAULT NULL,
  `rate` DECIMAL(10,2) NULL DEFAULT NULL,
  `operator` SMALLINT(6) NULL DEFAULT NULL,
  `by_percentage` TINYINT(4) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `promo_id` (`promo_id` ASC) VISIBLE,
  CONSTRAINT `promo_rate_ibfk_1`
    FOREIGN KEY (`promo_id`)
    REFERENCES `home_services`.`promo` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`reservation_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`reservation_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `reservation_id` INT(11) NULL DEFAULT NULL,
  `date_time` DATETIME NULL DEFAULT NULL,
  `info` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_253` (`reservation_id` ASC) VISIBLE,
  CONSTRAINT `FK_reservation_reservation_log`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `home_services`.`reservation` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`reservation_service_addon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`reservation_service_addon` (
  `reservation_id` INT(11) NOT NULL,
  `service_id` INT(11) NOT NULL,
  `addon_id` INT(11) NOT NULL,
  PRIMARY KEY (`reservation_id`, `service_id`, `addon_id`),
  INDEX `fkIdx_236` (`reservation_id` ASC) VISIBLE,
  INDEX `fkIdx_240` (`service_id` ASC) VISIBLE,
  INDEX `fkIdx_243` (`addon_id` ASC) VISIBLE,
  CONSTRAINT `FK_addon_reservation_service_addon`
    FOREIGN KEY (`addon_id`)
    REFERENCES `home_services`.`addon` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_reservation_reservation_service_addon`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `home_services`.`reservation` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_service_reservation_service_addon`
    FOREIGN KEY (`service_id`)
    REFERENCES `home_services`.`service` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`service_addon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`service_addon` (
  `service_id` INT(11) NOT NULL,
  `addon_id` INT(11) NOT NULL,
  PRIMARY KEY (`service_id`, `addon_id`),
  INDEX `fkIdx_203` (`service_id` ASC) VISIBLE,
  INDEX `fkIdx_210` (`addon_id` ASC) VISIBLE,
  CONSTRAINT `FK_addon_service_addon`
    FOREIGN KEY (`addon_id`)
    REFERENCES `home_services`.`addon` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_service_addon_service`
    FOREIGN KEY (`service_id`)
    REFERENCES `home_services`.`service` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`service_launch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`service_launch` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `service_id` INT(11) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `is_ended` TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fkIdx_140` (`service_id` ASC) VISIBLE,
  CONSTRAINT `FK_service_service_launch`
    FOREIGN KEY (`service_id`)
    REFERENCES `home_services`.`service` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`service_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`service_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `service_id` INT(11) NULL DEFAULT NULL,
  `date_time` DATETIME NULL DEFAULT NULL,
  `info` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_129` (`service_id` ASC) VISIBLE,
  CONSTRAINT `FK_service_service_log`
    FOREIGN KEY (`service_id`)
    REFERENCES `home_services`.`service` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`service_promo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`service_promo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `service_id` INT(11) NULL DEFAULT NULL,
  `promo_id` INT(11) NULL DEFAULT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_184` (`promo_id` ASC) VISIBLE,
  INDEX `fkIdx_196` (`service_id` ASC) VISIBLE,
  CONSTRAINT `FK_promo_service_promo`
    FOREIGN KEY (`promo_id`)
    REFERENCES `home_services`.`promo` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_service_service_promo`
    FOREIGN KEY (`service_id`)
    REFERENCES `home_services`.`service` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`service_rate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`service_rate` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `service_id` INT(11) NULL DEFAULT NULL,
  `set_date` DATE NULL DEFAULT NULL,
  `last_date` DATE NULL DEFAULT NULL,
  `rate` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_121` (`service_id` ASC) VISIBLE,
  CONSTRAINT `FK_service_service_rate`
    FOREIGN KEY (`service_id`)
    REFERENCES `home_services`.`service` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`user_access_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`user_access_level` (
  `user_id` INT(11) NOT NULL,
  `access_level_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `access_level_id`),
  INDEX `fkIdx_109` (`user_id` ASC) VISIBLE,
  INDEX `acces_level_id` (`access_level_id` ASC) VISIBLE,
  CONSTRAINT `FK_user_user_access_level`
    FOREIGN KEY (`user_id`)
    REFERENCES `home_services`.`user` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `user_access_level_ibfk_1`
    FOREIGN KEY (`access_level_id`)
    REFERENCES `home_services`.`access_level` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`user_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`user_address` (
  `user_id` INT(11) NOT NULL,
  `address_id` INT(11) NOT NULL,
  `is_default` TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`, `address_id`),
  INDEX `fkIdx_82` (`user_id` ASC) VISIBLE,
  INDEX `fkIdx_85` (`address_id` ASC) VISIBLE,
  CONSTRAINT `FK_address_user_address`
    FOREIGN KEY (`address_id`)
    REFERENCES `home_services`.`address` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_user_user_address`
    FOREIGN KEY (`user_id`)
    REFERENCES `home_services`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`user_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`user_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NULL DEFAULT NULL,
  `date_time` DATETIME NULL DEFAULT NULL,
  `info` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_101` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_user_user_logs`
    FOREIGN KEY (`user_id`)
    REFERENCES `home_services`.`user` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`user_promo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`user_promo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NULL DEFAULT NULL,
  `promo_id` INT(11) NULL DEFAULT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fkIdx_190` (`promo_id` ASC) VISIBLE,
  INDEX `fkIdx_199` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_promo_user_promo`
    FOREIGN KEY (`promo_id`)
    REFERENCES `home_services`.`promo` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_user_user_promo`
    FOREIGN KEY (`user_id`)
    REFERENCES `home_services`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `home_services`.`user_provider_assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `home_services`.`user_provider_assignment` (
  `reservation_id` INT(10) NOT NULL,
  `user_provider_id` INT(10) NOT NULL,
  `recurrency_number` SMALLINT(5) UNSIGNED NOT NULL,
  PRIMARY KEY (`reservation_id`, `user_provider_id`),
  INDEX `user_provider_id` (`user_provider_id` ASC) VISIBLE,
  CONSTRAINT `user_provider_assignment_ibfk_1`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `home_services`.`reservation` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `user_provider_assignment_ibfk_2`
    FOREIGN KEY (`user_provider_id`)
    REFERENCES `home_services`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



------- STORED PROCEDURES --------------

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
SHOW WARNINGS;
-- -----------------------------------------------------
-- Schema home_services
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema home_services
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `home_services` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
SHOW WARNINGS;
USE `home_services` ;

-- -----------------------------------------------------
-- procedure addressInsert
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`addressInsert`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addressInsert`(
	OUT _id INT,
	IN _province VARCHAR(50),
	IN _city VARCHAR(50),
	IN _barangay VARCHAR(50),
	IN _room_number VARCHAR(10),
	IN _bldg_number VARCHAR(10),
	IN _zip INT,
	IN _landmark VARCHAR(50)
)
BEGIN
	
	INSERT INTO address
		(province, city, barangay, room_number, bldg_number, zip, landmark, created_date)
	VALUES 
		(_province, _city, _barangay, _room_number, _bldg_number, _zip, _landmark, NOW());

	SELECT LAST_INSERT_ID() INTO _id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure addressUpdate
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`addressUpdate`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `addressUpdate`(
	in _id INT,
	IN _province VARCHAR(50),
	IN _city VARCHAR(50),
	IN _barangay VARCHAR(50),
	IN _room_number VARCHAR(10),
	IN _bldg_number VARCHAR(10),
	IN _zip INT,
	IN _landmark VARCHAR(50)
)
BEGIN
	
	UPDATE address
	SET
		province = _province,
		city = _city,
		barangay = _barangay,
		room_number = _room_number,
		bldg_number = _bldg_number,
		zip = _zip,
		landmark = _landmark,
		last_updated_date = NOW()
	WHERE id = _id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure completedSessionAddonDelete
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`completedSessionAddonDelete`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `completedSessionAddonDelete`(
	IN _completed_session_id INT,
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
	
	IF (_addon_id IS NULL) THEN
		DELETE FROM completed_session_service_addon 
		WHERE completed_session_id = _completed_session_id AND service_id = _service_id;
	
	ELSE
		DELETE FROM completed_session_service_addon
		WHERE completed_session_id = _completed_session_id 
			  AND service_id = _service_id 
			  AND addon_id = _addon_id;
	
	END IF;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure completedSessionInsert
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`completedSessionInsert`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `completedSessionInsert`(
	OUT _id INT,
	IN _reservation_id INT,
	IN _recurrency_number SMALLINT,
	IN _date DATE,
	IN _note VARCHAR(255)
)
BEGIN
	
	INSERT INTO completed_session
		(reservation_id, recurrency_number, date, note, created_date)
	VALUES 
		(_reservation_id, _recurrency_number, _date, _note, NOW());

	SELECT LAST_INSERT_ID() INTO _id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure completedSessionServiceAddonInsert
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`completedSessionServiceAddonInsert`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `completedSessionServiceAddonInsert`(
	IN _completed_session_id INT,
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
	
	INSERT INTO completed_session_service_addon (completed_session_id, service_id, addon_id)
	VALUES (_completed_session_id, _service_id, addon_id); 
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure completedSessionUpdateNote
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`completedSessionUpdateNote`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `completedSessionUpdateNote`(
	IN _id INT,
	IN _note VARCHAR(255)
)
BEGIN
	
	UPDATE completed_session
	SET note = _note
	WHERE id = _id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure isActiveUpdate
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`isActiveUpdate`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `isActiveUpdate`(
	IN _domain VARCHAR(20),
	IN _id INT,
	IN _is_active TINYINT
)
BEGIN
	SET @statement = CONCAT('UPDATE ', _domain, ' SET is_active = ', _is_active, ', last_updated_date = NOW() WHERE id = ', _id);
	
	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure managementDomainInsert
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`managementDomainInsert`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `managementDomainInsert`(
	OUT _id INT,
	IN _management_domain_type VARCHAR(50), -- service, addon or promo
	IN _name VARCHAR(50),
	IN _description VARCHAR(50)
)
BEGIN
	
	SET @statement = CONCAT('INSERT INTO ', _management_domain_type, ' (name, description, created_date) VALUES (''',
							_name, ''', ''', _description, ''', NOW());');

	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;

	SELECT LAST_INSERT_ID() INTO _id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure managementDomainRateInsert
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`managementDomainRateInsert`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `managementDomainRateInsert`(
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
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure managementDomainUpdate
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`managementDomainUpdate`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `managementDomainUpdate`(
	IN _id INT,
	IN _management_domain_type VARCHAR(50), -- service, addon or promo
	IN _name VARCHAR(50),
	IN _description VARCHAR(50)
)
BEGIN
	
	SET @statement = CONCAT('UPDATE ', _management_domain_type, ' SET name=''',
							_name, ''', description=''', _description, ''', last_updated_date = NOW() WHERE id=', _id);
	
	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure promoApply
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`promoApply`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `promoApply`(
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
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure promoDelete
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`promoDelete`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `promoDelete`(
	IN _id INT,
	IN _promo_domain VARCHAR(50) -- service, addon or promo
)
BEGIN
	
	SET @statement = CONCAT('DELETE FROM ', _promo_domain, '_promo WHERE id='
	, _id, ';');
	
	PREPARE query FROM @statement;
	EXECUTE query;
	DEALLOCATE PREPARE query;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure promoUpdate
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`promoUpdate`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `promoUpdate`(
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
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure reservationAddonDelete
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`reservationAddonDelete`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservationAddonDelete`(
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
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure reservationAddonInsert
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`reservationAddonInsert`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservationAddonInsert`(
	IN _reservation_id INT,
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
	
	INSERT INTO reservation_service_addon (reservation_id, service_id, addon_id)
	VALUES (_reservation_id, _service_id, addon_id); 
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure reservationInsert
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`reservationInsert`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservationInsert`(
	OUT _id INT,
	IN _user_id INT,
	IN _address_id INT,
	IN _status INT,
	IN _initial_date DATE,
	IN _additional_note VARCHAR(255)
)
BEGIN
	
	INSERT INTO reservation
		(user_id, address_id, status, initial_date, additional_note, created_date)
	VALUES 
		(_user_id, _address_id, _status, _initial_date, _additional_note, NOW());

	SELECT LAST_INSERT_ID() INTO _id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure reservationUpdate
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`reservationUpdate`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `reservationUpdate`(
	IN _id INT,
	IN _address_id INT,
	IN _status INT,
	IN _initial_date DATE,
	IN _additional_note VARCHAR(255)
)
BEGIN
	
	UPDATE reservation
	SET 
		address_id = _address_id, 
		status = _status, 
		initial_date = _initial_date, 
		additional_note = _additional_note,
        last_updated_date = NOW()
	WHERE id = _id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure serviceAddonDelete
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`serviceAddonDelete`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `serviceAddonDelete`(
	IN _service_id INT,
	IN _addon_id INT
)
BEGIN
			
	DELETE FROM service_addon
	WHERE service_id = _service_id AND addon_id = _addon_id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure userAccessLevelUpdate
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`userAccessLevelUpdate`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userAccessLevelUpdate`(
	IN _user_id INT,
	
	-- user access levels
	IN _is_basic TINYINT,
	IN _is_provider TINYINT,
	IN _is_admin TINYINT
)
BEGIN

	DECLARE basic_access_level_id INT UNSIGNED DEFAULT (SELECT id FROM access_level WHERE name = 'basic');
	DECLARE provider_access_level_id INT UNSIGNED DEFAULT (SELECT id FROM access_level WHERE name = 'provider');
	DECLARE admin_access_level_id INT UNSIGNED DEFAULT (SELECT id FROM access_level WHERE name = 'admin');
	
	IF _is_basic = 1 THEN
		INSERT IGNORE INTO user_access_level (user_id, access_level_id)
		VALUES (_user_id, basic_access_level_id);	
	ELSE 
		DELETE FROM user_access_level WHERE user_id = _user_id AND access_level_id = basic_access_level_id;
	END IF;
	
	IF _is_provider = 1 THEN
		INSERT IGNORE INTO user_access_level (user_id, access_level_id)
		VALUES (_user_id, provider_access_level_id);
	ELSE 
		DELETE FROM user_access_level WHERE user_id = _user_id AND access_level_id = provider_access_level_id;
	END IF;
	
	IF _is_admin = 1 THEN
		INSERT IGNORE INTO user_access_level (user_id, access_level_id)
		VALUES (_user_id, admin_access_level_id);
	ELSE 
		DELETE FROM user_access_level WHERE user_id = _user_id AND access_level_id = admin_access_level_id;
	END IF;
		
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure userAddressDelete
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`userAddressDelete`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userAddressDelete`(
	IN _user_id INT,
	IN _address_id INT
)
BEGIN

	DELETE FROM user_address
	WHERE user_id = _user_id AND address_id = _address_id;
		
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure userAddressInsertOrUpdate
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`userAddressInsertOrUpdate`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userAddressInsertOrUpdate`(
	IN _user_id INT,
	IN _address_id INT,
	IN _is_default TINYINT
)
BEGIN

	IF (NOT EXISTS(SELECT * FROM user_address WHERE user_id = _user_id AND address_id = _address_id)) THEN
	
		INSERT INTO user_address 
			(user_id, address_id, is_default)
		VALUES 
			(_user_id, _address_id, _is_default);
		
	ELSE 
		UPDATE user_address SET is_default = _is_default WHERE user_id = _user_id AND address_id = _address_id;
	END IF;
		
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure userInsert
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`userInsert`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userInsert`(
	OUT _id INT,
	IN _firstname VARCHAR(50),
	IN _lastname VARCHAR(50),
	IN _date_of_birth DATE,
	IN _gender TINYINT,
	IN _email VARCHAR(50),
	IN _contact_number VARCHAR(50)
)
BEGIN

	INSERT INTO user
		(firstname, lastname, date_of_birth, gender, email, contact_number, created_date)
	VALUES 
		(_firstname, _lastname, _date_of_birth, _gender, _email, _contact_number, NOW());
		
	SELECT LAST_INSERT_ID() INTO _id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure userProviderAssignmentDelete
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`userProviderAssignmentDelete`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userProviderAssignmentDelete`(
	IN _user_provider_id INT,
	IN _reservation_id INT,
	IN _recurrency_number TINYINT
)
BEGIN
	
	DELETE FROM user_provider_assignment
	WHERE user_provider_id = _user_provider_id 
	AND reservation_id = _reservation_id 
	AND recurrency_number = _recurrency_number;
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure userProviderAssignmentInsert
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`userProviderAssignmentInsert`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userProviderAssignmentInsert`(
	IN _user_provider_id INT,
	IN _reservation_id INT,
	IN _recurrency_number TINYINT
)
BEGIN

	INSERT INTO user_provider_assignment (user_provider_id, reservation_id, recurrency_number)
	VALUES (_user_provider_id, reservation_id, recurrency_number);
	
END$$

DELIMITER ;
SHOW WARNINGS;

-- -----------------------------------------------------
-- procedure userUpdate
-- -----------------------------------------------------

USE `home_services`;
DROP procedure IF EXISTS `home_services`.`userUpdate`;
SHOW WARNINGS;

DELIMITER $$
USE `home_services`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userUpdate`(
	IN _id INT,
	IN _firstname VARCHAR(50),
	IN _lastname VARCHAR(50),
	IN _date_of_birth DATE,
	IN _gender TINYINT,
	IN _email VARCHAR(50), 
	IN _contact_number VARCHAR(50)
)
BEGIN

	UPDATE user
	SET 
		firstname = _firstname, 
		lastname = _lastname, 
		date_of_birth = _date_of_birth, 
		gender = _gender, 
		email = _email, 
		contact_number = _contact_number,
        last_updated_date = NOW()
	WHERE id = _id;
	
END$$

DELIMITER ;
SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
