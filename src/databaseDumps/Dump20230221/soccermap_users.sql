-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: soccermap
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mail` varchar(60) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `favclubid` int DEFAULT NULL,
  `favstadiumid` int DEFAULT NULL,
  `IsAuth` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`username`),
  UNIQUE KEY `mail_UNIQUE` (`mail`),
  KEY `favclub_idx` (`favclubid`),
  KEY `favstadium_idx` (`favstadiumid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'GottFan14','$2b$10$19nHZS73gro3gaqoQEmgBepJYJs/udLsUTvML1ymlcymLaq1HE3Ky','josef.grillnberger@gmail.com',NULL,NULL,15,3,0),(6,'Test0','$2b$10$1AurO29m79e74WEZyQEufuY3Kwe4EvTGYW.JEzC8YxPJ7cRBWhFD6','test0@mail.com',NULL,NULL,NULL,NULL,0),(7,'Beispiel','$2b$10$sp0WDCaLuJ9.bhxhYMLpuO4por/2X9qoFXZTANPq69AIpEgu5PLE.','beispiel@gmail.com',NULL,NULL,NULL,NULL,0),(8,'test8','$2b$10$pbb7x1QimoM3cGkVp9t7aOIxFdWI6UPKcTcr7u7uoNzqIMgB.cHzi','test@mail.com',NULL,NULL,NULL,NULL,0),(9,'test9','$2b$10$rqunQE4hCqMfV8igcPiBY.niSrlcG1L66vEj/Lo6zNwwZFy9A6PtG','test9@mail.com',NULL,NULL,NULL,NULL,0),(11,'test','$2b$10$pb6A77PAxWfEIdb/2TJIVOvy0eMiRVSaiKTAgELO1MhF2QXGGZ0SC','asda@mail.com',NULL,NULL,15,18,0),(12,'Tester','$2b$10$cGMbC8qwl2yHKP9esixpquiQllZwxs1qEEksf2T9clA2U7GGFy84a','qibisabd@mail.com',NULL,NULL,NULL,NULL,0),(13,'hofa','$2b$10$S6RLTJiFI3B0TPebIDh/d.lti80GdTgeNmNswkrD4n00oIA7BUe8q','asdasd@mail.com',NULL,NULL,15,19,0),(15,'user','$2b$10$e9epdaWE2hm62BUdluCtsuWyDei3UiDTmMdZsO7nT2ABQ1KNqdbeW','auszfdaui@mail.com',NULL,NULL,NULL,NULL,0),(16,'Hofaaa','$2b$10$CaFXgnYlrTGeypQM0Syo2Ohtr9E2v5iJvfeizrWZ9OsvYoNAzan/S','stief.hofer@gmail.com',NULL,NULL,10,28,1),(17,'asdf','$2b$10$0MiPC.s4B0W8PuwlHSPnMuAQqIPlmVHivH.l/Hy9SPuAkKNYzaNRm','aigd@mail.com',NULL,NULL,NULL,NULL,0),(20,'Testuser','$2b$10$H5ftREhH/L7Zwp.wqB8O5uvjZgOqe0zMSlKA73e9bj3SPLQSsAekK','asdihashoin@mail.com',NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-21 14:20:46
