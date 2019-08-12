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
