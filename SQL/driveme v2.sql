-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le : Sam 03 Mai 2014 à 22:49
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
-- Structure de la table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  `picture` varchar(50) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `date`, `picture`, `user_id`) VALUES
(1, 'Une news', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam purus est, mattis id quam quis, blandit bibendum quam. Aliquam eu euismod nisl. Etiam ut erat nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam orci elit, pretium sit amet vehicula sit amet, rutrum ut lectus. Etiam condimentum risus neque, quis volutpat est fringilla ac. Quisque eget rhoncus nibh, a dignissim lorem. Aliquam sed turpis leo. Proin mattis faucibus suscipit. Vivamus vitae porttitor sapien. Curabitur sodales tortor augue, id pharetra enim porta id. Fusce venenatis quam eget mauris egestas, ut ultricies risus vestibulum.\r\n\r\nIn hac habitasse platea dictumst. Aenean mattis, dolor eu lacinia dignissim, lectus dolor ullamcorper ligula, non aliquam sem ante quis lorem. Mauris cursus a leo vel varius. Pellentesque a turpis et orci sodales pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce quam neque, sollicitudin sed erat nec, malesuada sodales ipsum. Etiam eu pharetra leo. Donec aliquam hendrerit egestas. Aliquam aliquam, metus vitae tincidunt tempus, metus mauris convallis lectus, quis suscipit dui lacus et augue. Nulla neque nibh, mollis at mauris eget, feugiat elementum sem.\r\n\r\nAliquam feugiat purus nec tincidunt convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc pulvinar vehicula elit, vitae pulvinar ipsum tincidunt id. Donec ullamcorper, magna eget feugiat vehicula, ipsum mi porttitor sapien, at volutpat nisi dolor a lacus. Aenean eleifend, metus feugiat molestie viverra, risus nibh ornare tortor, at egestas mi purus non urna. Suspendisse lobortis, dui ac adipiscing molestie, eros risus sodales velit, et accumsan ante elit a tellus. Duis sagittis mauris sed mauris suscipit congue. Mauris sed quam lorem. Nulla sed felis felis. Morbi scelerisque, enim ut eleifend pharetra, orci purus porttitor dolor, vel sodales lectus ligula vel massa. Aliquam erat volutpat. Vestibulum mi lacus, cursus ut iaculis non, varius eget nisl. Nam eget orci magna.\r\n\r\nEtiam in velit pharetra, consectetur lorem quis, ultricies massa. Mauris faucibus metus nec erat pretium adipiscing. Aliquam erat volutpat. Vestibulum mollis dictum felis et aliquet. Suspendisse vel leo neque. Quisque non mauris semper, dictum lorem eu, blandit dui. Etiam vehicula lobortis arcu eu scelerisque. Suspendisse potenti. Sed egestas tortor eu ipsum sodales, et consequat sapien hendrerit. Donec sodales odio at dui vehicula faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\r\n\r\nEtiam nisl arcu, sollicitudin ac dolor at, congue hendrerit eros. Morbi ac porta sapien. Cras non nibh nec dui posuere ultricies vulputate ut dui. Suspendisse fermentum commodo diam vitae pretium. Nunc tristique nunc at dictum blandit. Donec convallis dui vel dui venenatis consectetur. Quisque malesuada ligula vitae tempus gravida. Pellentesque diam mauris, fringilla quis nibh id, adipiscing commodo nibh. Nulla facilisi. Maecenas et augue at risus eleifend bibendum. Nam orci est, consequat vel euismod at, dignissim ut ipsum. Sed nec tortor vitae lectus auctor suscipit.', '2014-04-23 12:39:17', 'http://lorempixel.com/50/50/', 1),
(2, 'Du nouveau par ici', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam purus est, mattis id quam quis, blandit bibendum quam. Aliquam eu euismod nisl. Etiam ut erat nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam orci elit, pretium sit amet vehicula sit amet, rutrum ut lectus. Etiam condimentum risus neque, quis volutpat est fringilla ac. Quisque eget rhoncus nibh, a dignissim lorem. Aliquam sed turpis leo. Proin mattis faucibus suscipit. Vivamus vitae porttitor sapien. Curabitur sodales tortor augue, id pharetra enim porta id. Fusce venenatis quam eget mauris egestas, ut ultricies risus vestibulum.\r\n\r\nIn hac habitasse platea dictumst. Aenean mattis, dolor eu lacinia dignissim, lectus dolor ullamcorper ligula, non aliquam sem ante quis lorem. Mauris cursus a leo vel varius. Pellentesque a turpis et orci sodales pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce quam neque, sollicitudin sed erat nec, malesuada sodales ipsum. Etiam eu pharetra leo. Donec aliquam hendrerit egestas. Aliquam aliquam, metus vitae tincidunt tempus, metus mauris convallis lectus, quis suscipit dui lacus et augue. Nulla neque nibh, mollis at mauris eget, feugiat elementum sem.\r\n\r\nAliquam feugiat purus nec tincidunt convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc pulvinar vehicula elit, vitae pulvinar ipsum tincidunt id. Donec ullamcorper, magna eget feugiat vehicula, ipsum mi porttitor sapien, at volutpat nisi dolor a lacus. Aenean eleifend, metus feugiat molestie viverra, risus nibh ornare tortor, at egestas mi purus non urna. Suspendisse lobortis, dui ac adipiscing molestie, eros risus sodales velit, et accumsan ante elit a tellus. Duis sagittis mauris sed mauris suscipit congue. Mauris sed quam lorem. Nulla sed felis felis. Morbi scelerisque, enim ut eleifend pharetra, orci purus porttitor dolor, vel sodales lectus ligula vel massa. Aliquam erat volutpat. Vestibulum mi lacus, cursus ut iaculis non, varius eget nisl. Nam eget orci magna.', '2014-04-20 16:53:39', 'http://lorempixel.com/50/50/', 1);

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
  `email` varchar(50) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `car` varchar(25) NOT NULL,
  `musicType` varchar(40) NOT NULL,
  `promo` int(11) NOT NULL,
  `room` int(11) NOT NULL,
  `picture` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `phone`, `car`, `musicType`, `promo`, `room`, `picture`) VALUES
(1, 'orion.charlier', 'HIkIRpXM', 'orion.charlier@minesdedouai.fr', '0635454285', 'Citroen C3', 'Electro & pop', 2014, 4018, 'http://lorempixel.com/100/100/people/');

-- --------------------------------------------------------

--
-- Structure de la table `user_trip`
--

CREATE TABLE IF NOT EXISTS `user_trip` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `trip_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
