angular.module('driveme', ['ionic', 'restangular', 'ngStorage'])
.run(function($ionicPlatform, apiService, pushNotificationService) {
  // Ionic Init
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // Init Push notification service
  pushNotificationService.initialize();

  // Init api service to place token in HTTP headers
  apiService.init();
})
.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
  // Configure Restangular base route
  RestangularProvider.setBaseUrl('http://localhost:8080/api/v1');
  
	// Configure routes
	$stateProvider.state('login', {
    url: "/login",
    templateUrl: "views/login.html",
    controller: 'LogInCtrl'
  })
  .state('start', {
    url: "/start",
    templateUrl: "views/start.html",
    controller: 'StartCtrl'
  })
  .state('signup', {
    url: "/signup",
    templateUrl: "views/signup.html",
    controller: 'SignUpCtrl'
  })
	.state('tabs', {
    url: "/tabs",
    abstract: true,
    templateUrl: "views/tabs.html"
  })
	.state('tabs.news', {
    url: '/news',
    views: {
      'news-tab': {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl'
      }
    }
  })
  .state('tabs.article', {
    url: '/article/{id:[0-9]{1,8}}',
    views: {
      'news-tab': {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      }
    }
  })
  .state('tabs.trip', {
    url: '/trip',
    views: {
      'trip-tab': {
        templateUrl: 'views/trip.html',
        controller: 'TripCtrl'
      }
    }
  })
  .state('tabs.addTrip', {
    url: '/addTrip',
    views: {
      'trip-tab': {
        templateUrl: 'views/addTrip.html',
        controller: 'AddTripCtrl'
      }
    }
  })
  .state('tabs.displayTrip', {
    url: '/trip/{id:[0-9]{1,8}}',
    views: {
      'trip-tab': {
        templateUrl: 'views/displayTrip.html',
        controller: 'DisplayTripCtrl'
      }
    }
  })
  .state('tabs.profile', {
    url: '/profile',
    views: {
      'settings-tab': {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('tabs.user', {
    url: '/profile/{id:[0-9]{1,8}}',
    views: {
      'trip-tab': {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('tabs.settings', {
    url: '/settings',
    views: {
      'settings-tab': {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });
  // If unknown route, redirect to sign-in
  $urlRouterProvider.otherwise("/start");
})
