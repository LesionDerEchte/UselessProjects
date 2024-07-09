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
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clubs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `short` varchar(3) NOT NULL,
  `stadiumid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clubinstadium_idx` (`stadiumid`),
  CONSTRAINT `stadiumID` FOREIGN KEY (`stadiumid`) REFERENCES `stadiums` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES (1,'FC Augsburg','FCA',18),(2,'1. FC Union Berlin','UNI',2),(3,'Hertha BSC','BSC',9),(4,'VfL Bochum 1848','VFL',16),(5,'SV Werder Bremen','SVW',17),(6,'Borussia Dortmund','BVB',13),(7,'Eintracht Frankfurt','SGE',5),(8,'Sport-Club Freiburg','SCF',6),(9,'TSG Hoffenheim','TSG',10),(10,'1. FC Koeln','KOE',12),(11,'RB Leipzig','RBL',11),(12,'Bayer 04 Leverkusen','B04',3),(13,'1. FSV Mainz 05','M05',8),(14,'Borussia M”nchengladbach','BMG',4),(15,'FC Bayern Muenchen','FCB',1),(16,'FC Schalke 04','S04',14),(17,'VfB Stuttgart','VFB',7),(18,'VfL Wolfsburg','WOB',15),(19,'Eintracht Braunschweig','EBS',21),(20,'DSC Arminia Bielefeld','ARM',33),(21,'SV Darmstadt 98','D98',29),(22,'Fortuna Duesseldorf','F95',30),(23,'SpVgg Greuther Fuerth','SGF',34),(24,'Hamburger SV','HSV',36),(25,'Hannover 96','H96',23),(26,'1. FC Heidenheim 1846','FCH',35),(27,'1. FC Kaiserslautern','FCK',22),(28,'Karlsruher SC','KSC',19),(29,'Holstein Kiel','HOL',24),(30,'1. FC Magdeburg','MAG',28),(31,'1. FC Nuernberg','FCN',27),(32,'SC Paderborn 07','PAD',25),(33,'SSV Jahn Regensburg','JAH',26),(34,'F.C. Hansa Rostock','HAN',32),(35,'FC St. Pauli','STP',31),(36,'SV Sandhausen','SVS',20),(37,'Erzgebirge Aue','ERZ',42),(38,'SpVgg Bayreuth','BAY',44),(39,'Borussia Dortmund II','BOR',49),(40,'Dynamo Dresden','SGD',50),(41,'MSV Duisburg','DUI',51),(42,'SV Elversberg','SVE',56),(43,'Rot-Weiss Essen','ESS',55),(44,'SC Freiburg II','SCF',41),(45,'Hallescher FC','HFC',46),(46,'FC Ingolstadt 04','FCI',37),(47,'FC Victoria Koeln','VIK',53),(48,'SV Waldhof Mannheim','SVW',40),(49,'SV Meppen','SVM',45),(50,'1860 Muenchen','M60',54),(51,'VfB Oldenburg','VFB',48),(52,'VfL Osnabrueck','OSN',38),(53,'1. FC Saarbruecken','FCS',47),(54,'SC Verl','SCV',52),(55,'SV Wehen Wiesbaden','SV',39),(56,'FSV Zwickau','ZWI',43),(57,'SCR Altach','ALT',58),(58,'SK Strum Graz','STU',62),(59,'TSV Hartberg','HTB',63),(60,'WSG Tirol','WSG',67),(61,'SK Austria Klagenfurt','SKA',68),(62,'LASK','ASK',64),(63,'SC Austria Lustenau','ALU',66),(64,'SV Ried','SVR',60),(65,'FC Red Bull Salzburg','RBS',65),(66,'Wolfsberger AC','WAC',61),(67,'FK Austria Wien','FAK',59),(68,'SK Rapid Wien','SCR',57),(69,'SKU Amstetten','SKU',78),(70,'FC Dornbirn 1913','FCD',72),(71,'Grazer AK','GAK',62),(72,'SK Sturm Graz II','STU',81),(73,'SV Horn','SVH',79),(74,'KSV 1919','KSV',75),(75,'SV Lafnitz','SVL',80),(76,'FC Blau Weiá Linz','BWL',71),(77,'FC Admira Wacker Moedling','ADM',69),(78,'FC Liefering','FCL',73),(79,'SKN St. Poelten','SKN',77),(80,'SK BMD Vorwaerts Steyr','SKV',76),(81,'FAC WIEN','FAC',70),(82,'First Vienna FC 1984','VIE',74),(83,'Rapid Wien II','RAP',57),(84,'Young Violets Austria Wien','AUS',59),(85,'FC Basel','BAS',84),(86,'BSC Young Boys','YB',85),(87,'Servette FC','SFC',89),(88,'FC Lugano','LUG',86),(89,'FC  Luzern','LUZ',87),(90,'FC Sion','SIO',90),(91,'FC St. Gallen','SG',88),(92,'FC Winterthur','WIN',91),(93,'FC ZÃ¼rich','FCZ',83),(94,'Grasshopper-Club ZÃ¼rich','GC',83),(99,'FC Muster','MUS',100),(100,'FC Beispiel','BSP',100);
/*!40000 ALTER TABLE `clubs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-26 22:30:48
