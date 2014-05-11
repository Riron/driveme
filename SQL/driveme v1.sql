-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le : Lun 28 Avril 2014 à 19:45
-- Version du serveur: 5.5.20
-- Version de PHP: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `driveme`
--

-- --------------------------------------------------------

--
-- Structure de la table `trip`
--

CREATE TABLE IF NOT EXISTS `trip` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `seats` int(11) NOT NULL,
  `direction` varchar(45) NOT NULL,
  `time` time NOT NULL,
  `finished` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Used to store all trips' AUTO_INCREMENT=6 ;

--
-- Contenu de la table `trip`
--

INSERT INTO `trip` (`id`, `user_id`, `seats`, `direction`, `time`, `finished`) VALUES
(1, 1, 3, 'Lahiure', '10:39:43', 1),
(2, 1, 3, 'Lahiure', '11:09:00', 1),
(3, 1, 2, 'Bourseul', '00:00:00', 1),
(4, 1, 3, 'Carrefour', '00:00:00', 1),
(5, 1, 5, 'Camembert', '00:00:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(25) NOT NULL,
  `car` varchar(25) NOT NULL,
  `musicType` varchar(40) NOT NULL,
  `promo` varchar(20) NOT NULL,
  `room` int(11) NOT NULL,
  `picture` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `car`, `musicType`, `promo`, `room`, `picture`) VALUES
(1, 'orion.charlier', 'HIkIRpXM', '0', 'Citroen C3', 'Electro, pop', '2014', 4018, 'http://lorempixel.com/100/100/people/');

-- --------------------------------------------------------

--
-- Structure de la table `user_trip`
--

CREATE TABLE IF NOT EXISTS `user_trip` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `trip_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
