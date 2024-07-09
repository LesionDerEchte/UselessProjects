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
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL,
  `stadiumid` int NOT NULL,
  `aussicht` double DEFAULT NULL,
  `ausstattung` double DEFAULT NULL,
  `essen` double DEFAULT NULL,
  `standort` double DEFAULT NULL,
  `stimmung` double DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`),
  KEY `usersRating_idx` (`username`),
  KEY `gamesRating_idx` (`stadiumid`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (8,'Test2',37,NULL,NULL,NULL,NULL,NULL,'Suuuuuuuuper!!!!!!!!!!!!!!!!!!'),(11,'Test2',1,NULL,NULL,NULL,NULL,NULL,'Super!'),(15,'Test1',1,NULL,NULL,NULL,NULL,NULL,'Super'),(16,'Test1',57,NULL,NULL,NULL,NULL,NULL,'Super'),(17,'Test5',64,NULL,NULL,NULL,NULL,NULL,'Asigd'),(20,'Test5',57,NULL,NULL,NULL,NULL,NULL,'asdasd'),(21,'Test5',2,NULL,NULL,NULL,NULL,NULL,'Super'),(27,'Test5',1,NULL,NULL,NULL,NULL,NULL,'Toll'),(29,'GottesSohn',38,NULL,NULL,NULL,NULL,NULL,'Des is ds beste Stadion weit und breit! Amen! Ich werde bis zum eine meines Lebens jedes Spile dort besuchen!'),(30,'Test4',4,NULL,NULL,NULL,NULL,NULL,'Super'),(31,'Test4',57,NULL,NULL,NULL,NULL,NULL,'Hat mir gut gefallen'),(36,'Test4',1,NULL,NULL,NULL,NULL,NULL,'Super'),(37,'Test4',20,NULL,NULL,NULL,NULL,NULL,'Test'),(38,'GottFan14',1,NULL,NULL,NULL,NULL,NULL,'toll'),(39,'Beispiel',4,NULL,NULL,NULL,NULL,NULL,'Hat mir gut gefallen!'),(41,'test8',1,NULL,NULL,NULL,NULL,NULL,'Test'),(42,'Test0',57,NULL,NULL,NULL,NULL,NULL,'Supa'),(43,'Test0',264,NULL,NULL,NULL,NULL,NULL,''),(44,'Test0',78,NULL,NULL,NULL,NULL,NULL,''),(45,'Test0',68,NULL,NULL,NULL,NULL,NULL,''),(46,'Test0',67,NULL,NULL,NULL,NULL,NULL,''),(47,'Test0',72,NULL,NULL,NULL,NULL,NULL,''),(48,'test9',4,NULL,NULL,NULL,NULL,NULL,'');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-14 14:08:09
