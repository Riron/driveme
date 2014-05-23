angular.module('driveme', ['ionic', 'restangular', 'ngStorage'])
.run(function($ionicPlatform, apiService, pushNotificationService, tokenInterceptor, userService) {
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

  tokenInterceptor.init();
  userService.checkUserIsLogged("tabs.news", true);
})
//.constant('API_URL', 'http://localhost:8080')
.constant('API_URL', 'http://rlier.fr:8282')
.config(function($stateProvider, $urlRouterProvider, RestangularProvider, API_URL) {
  // Configure Restangular base route
  RestangularProvider.setBaseUrl(API_URL + '/api/v1');

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
  .state('intro', {
    url: "/intro",
    templateUrl: "views/intro.html",
    controller: 'IntroCtrl'
  })
  .state('about', {
    url: "/about",
    templateUrl: "views/about.html",
    controller: 'IntroCtrl'
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
