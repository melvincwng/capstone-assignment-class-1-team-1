CREATE DATABASE  IF NOT EXISTS `bdd_assignment` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bdd_assignment`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: bdd_assignment
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genreID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`genreID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'action','Action movies are listed here'),(2,'anime','Anime movies are listed here'),(3,'fantasy','Fantasy movies are listed here'),(4,'sci-fi','Sci-fi movies are listed here');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movieID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `releaseDate` datetime NOT NULL,
  `imageURL` longtext NOT NULL,
  `genreID` int NOT NULL,
  `active` varchar(1) NOT NULL,
  `dateInserted` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`movieID`),
  KEY `genreID_idx` (`genreID`),
  CONSTRAINT `genreID` FOREIGN KEY (`genreID`) REFERENCES `genre` (`genreID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'Black Adam','In ancient Kahndaq, Teth Adam was bestowed the almighty powers of the gods. After using these powers for vengeance, he was imprisoned, becoming Black Adam. Nearly 5,000 years have passed, and Black Adam has gone from man to myth to legend.','2022-10-20 10:00:00','https://m.media-amazon.com/images/M/MV5BYzZkOGUwMzMtMTgyNS00YjFlLTg5NzYtZTE3Y2E5YTA5NWIyXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',1,'Y','2022-12-06 17:09:17'),(2,'Suzume no Tojimari','Seventeen-year-old Suzume discovers a mysterious door in the mountains, and soon other doors begin appearing across Japan. As the doors open, they release disasters and destruction, and it\'s up to Suzume to close them again.','2022-11-11 10:00:00','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQXW3Qz9W-0x2YpwrTVpk2SI7D07uAVzwdmIymmJOyLuWMyJqkC',2,'Y','2022-12-06 17:09:17'),(3,'Pinocchio','In an Italian village, the wooden puppet Pinocchio is brought to life by the Blue Fairy and seeks the life of adventure while striving to be a real boy. Pinocchio\'s life is turned upside down when he leaves his father to follow the circus.','2022-09-08 12:00:00','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjkbBqL3POWZb7EJmte1wpdZRJkE5_pkV532SF_-zl8LH2mN3a',3,'Y','2022-12-06 17:09:17'),(4,'Warriors of Future 2022','When a meteor carrying a destructive plant strikes the world, a suicide squad is given hours to save their post-apocalyptic city from total collapse.','2022-08-25 09:30:00','https://cityonfire.com/wp-content/uploads/2022/08/MV5BMmVhNmMwNWYtMmYwMy00MzNhLWFlNDUtY2Q1YjlhODQzMDE1XkEyXkFqcGdeQXVyMTI5ODA1OTU0._V1_.jpg',4,'Y','2022-12-06 17:09:17'),(5,'Your Name.','Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.','2016-11-03 10:00:00','https://contentserver.com.au/assets/525768_gnau_yourname_p_v7_aa.jpg',2,'N','2022-12-06 17:12:23'),(6,'Weathering with You','In Tokyo, a runaway high school student facing financial struggles ends up with a job at a small-time publisher. One day, he meets a young girl who has the ability to control the weather.','2019-07-19 10:00:00','https://preview.redd.it/nlf34se7m0421.jpg?auto=webp&s=13ba05998ba28d0f4204e8cfab72fec696e5defc',2,'N','2022-12-06 17:12:23');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin@gmail.com','Mary','admin','$2a$10$SKg1hPFvl2bIVQladweKS.RQJmnHmiAmKfyre17/TsizIvt7WoVSK'),(2,'user@gmail.com','Jeff','user','$2a$10$3EAgypS6t8EMPzKKZe4uGu2fEFhoYbDQ7Z7xY7JFafNr/yg3twCfi');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bdd_assignment'
--

--
-- Dumping routines for database 'bdd_assignment'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-17 21:33:41
