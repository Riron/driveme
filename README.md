Drive Me
=========

Drive Me est une application mobile construite par des étudiants des [Mines Douai] dans le cadre du concours Appl'it.

> Le concours Appl’It vise la promotion des écoles de l’Institut Mines-Télécom auprès de leurs futurs admis, en proposant aux élèves de créer une application Android ayant pour thème la vie de leur école.

L'idée a donc été de concevoir une application qui simplifierait la gestion des voyages pour les élèves des Mines Douai.
En effet, le campus rassemblant les chambres étudiantes étant éloigné des bâtiments ou se déroulent les cours, il est bien souvent nécessaire de s'y rendre en voiture.

Chaque matin, une chasse à la voiture a donc lieu, et il est souvent bien difficile de trouver un conducteur dans les temps, obligeant alors les élèves à une longue marche solitaire de 20 minutes sous la pluie du Noooord...

Pour répondre à ce problème, l'application permet :
* Aux conducteurs d'enregistrer le trajet qu'ils ont prévu de faire à l'avance
* Aux passagers de s'enregistrer sur un trajet proposé

En plus de ça, chacun disposera d'un profil utilisateur basé sur ses identifiants école et personnalisable, afin de trouver la voiture qui lui correspond le mieux ou de rencontrer de nouveaux Mineurs !

Un système de news est également implémenté pour permettre aux étudiants d'accéder rapidement à toutes les infos concernant leur campus.

Utilisation
-----------

Pour utiliser l'application **vous devez être connecté à internet**.

Le username est la concaténation du prénom et du nom, reliés par un point. En effet cette syntaxe suit celle utilisée pour les comptes élèves Mines Douai.

Pour toute question ou problème, n'hésitez pas à nous contacter sur l'adresse orioncharlier@gmail.com ou jbbeuzelin@gmail.com. En effet, notre application repose sur un serveur (API REST) hébergé chez nous, et il se peut qu'il se déconnecte par moment. Si besoin nous interviendrons donc pour le rétablir dans les plus brefs délais.

En vous souhaitant une bonne utilisation !

Technologies
-----------

Drive Me a été développé uniquement avec des technologies webs. L'idée était de profiter de l'opportunité pour rendre services aux élèves des Mines Douai, bien sûr, mais également pour réaliser un *showcase* technologique démontrant la viabilité des applications mobiles réalisés avec les dernières technologies webs. Rapide, fluide interragissant avec des fonctionnalités native du téléphone, connecté, Drive Me n'a rien à envier à une application native.

En effet nous avons la profonde conviction que les *Mobile Web App* sont un choix judicieux dans 95% des cas, et que peu à peu ils vont prendre le pas sur les développements natifs de par leur fléxibilité, leur performance, et leur facilité à les porter d'une plateforme à une autre.

Côté client :

* AngularJS
* Utilisation de Framework Ionic
* Cordova pour packager l'app

Et côté serveur :

* NodeJS
* Utilisation du framework [Express]
* Utilisation de la librairie Socket.IO pour gérer les sockets
* Une base de données MySQL

Auteurs
---
A la réalisation, les **Peaches** :
* Jean-Baptiste Beuzelin
* Jérôme Chaaban
* Orion Charlier

Version
----

1.0

License
----

MIT


**Free Software, Hell Yeah!**

[Mines Douai]:http://www.mines-douai.fr/
[Express]:http://expressjs.com