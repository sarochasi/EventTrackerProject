-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema jobapplicationsdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `jobapplicationsdb` ;

-- -----------------------------------------------------
-- Schema jobapplicationsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jobapplicationsdb` DEFAULT CHARACTER SET utf8 ;
USE `jobapplicationsdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `status` ;

CREATE TABLE IF NOT EXISTS `status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
  `note` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `onsite_remote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `onsite_remote` ;

CREATE TABLE IF NOT EXISTS `onsite_remote` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `note` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `job`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `job` ;

CREATE TABLE IF NOT EXISTS `job` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `position` VARCHAR(100) NOT NULL,
  `company` VARCHAR(100) NOT NULL,
  `date_applied` DATETIME NULL,
  `description` TEXT NULL,
  `enabled` TINYINT NULL,
  `date_updated` DATETIME NULL,
  `user_id` INT NOT NULL,
  `note` VARCHAR(45) NULL,
  `status_id` INT NOT NULL,
  `onsite_remote_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_job_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_job_status1_idx` (`status_id` ASC) VISIBLE,
  INDEX `fk_job_onsite_remote1_idx` (`onsite_remote_id` ASC) VISIBLE,
  CONSTRAINT `fk_job_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_job_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_job_onsite_remote1`
    FOREIGN KEY (`onsite_remote_id`)
    REFERENCES `onsite_remote` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS job@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'job'@'localhost' IDENTIFIED BY 'job';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'job'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobapplicationsdb`;
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`) VALUES (1, 'admin', 'admin', 'admin', 'admin', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `status`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobapplicationsdb`;
INSERT INTO `status` (`id`, `status`, `note`) VALUES (1, 'Not applied yet', NULL);
INSERT INTO `status` (`id`, `status`, `note`) VALUES (2, 'Applied', NULL);
INSERT INTO `status` (`id`, `status`, `note`) VALUES (3, 'Interviewed', NULL);
INSERT INTO `status` (`id`, `status`, `note`) VALUES (4, 'Offered', NULL);
INSERT INTO `status` (`id`, `status`, `note`) VALUES (5, 'Rejected', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `onsite_remote`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobapplicationsdb`;
INSERT INTO `onsite_remote` (`id`, `name`, `note`) VALUES (1, 'Onsite', NULL);
INSERT INTO `onsite_remote` (`id`, `name`, `note`) VALUES (2, 'Remote', NULL);
INSERT INTO `onsite_remote` (`id`, `name`, `note`) VALUES (3, 'Hybrid', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `job`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobapplicationsdb`;
INSERT INTO `job` (`id`, `position`, `company`, `date_applied`, `description`, `enabled`, `date_updated`, `user_id`, `note`, `status_id`, `onsite_remote_id`) VALUES (1, 'Java developer', 'ABC inc', '2024-09-06', NULL, 1, NULL, 1, NULL, 1, 1);
INSERT INTO `job` (`id`, `position`, `company`, `date_applied`, `description`, `enabled`, `date_updated`, `user_id`, `note`, `status_id`, `onsite_remote_id`) VALUES (2, 'Software engineer', 'Turbo Tech', NULL, NULL, 1, NULL, 1, NULL, 2, 2);

COMMIT;

