-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: soccermap
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `stadiums`
--

DROP TABLE IF EXISTS `stadiums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stadiums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `region` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `opening` int unsigned DEFAULT NULL,
  `capacity` int unsigned DEFAULT NULL,
  `author1` varchar(50) DEFAULT NULL,
  `link1` varchar(200) DEFAULT NULL,
  `license1` varchar(20) DEFAULT NULL,
  `llink1` varchar(200) DEFAULT NULL,
  `plink1` varchar(200) DEFAULT NULL,
  `author2` varchar(50) DEFAULT NULL,
  `link2` varchar(200) DEFAULT NULL,
  `license2` varchar(20) DEFAULT NULL,
  `llink2` varchar(200) DEFAULT NULL,
  `plink2` varchar(200) DEFAULT NULL,
  `author3` varchar(50) DEFAULT NULL,
  `link3` varchar(200) DEFAULT NULL,
  `license3` varchar(20) DEFAULT NULL,
  `llink3` varchar(200) DEFAULT NULL,
  `plink3` varchar(200) DEFAULT NULL,
  `author4` varchar(50) DEFAULT NULL,
  `link4` varchar(200) DEFAULT NULL,
  `license4` varchar(200) DEFAULT NULL,
  `llink4` varchar(200) DEFAULT NULL,
  `plink4` varchar(200) DEFAULT NULL,
  `author5` varchar(50) DEFAULT NULL,
  `link5` varchar(200) DEFAULT NULL,
  `license5` varchar(20) DEFAULT NULL,
  `llink5` varchar(200) DEFAULT NULL,
  `plink5` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-24 23:44:41
