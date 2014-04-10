angular.module('driveme', ['ionic', 'restangular', 'ngStorage'])
.run(function($ionicPlatform, apiService) {
  // Ionic Init
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // Init api service to place token in HTTP headers
  apiService.init();
})
.config(function($stateProvider, $urlRouterProvider) {
	// Configure routes
	$stateProvider.state('signin', {
    url: "/sign-in",
    templateUrl: "views/sign-in.html",
    controller: 'SignInCtrl'
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
        controller: 'NewsCtrl'
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
  $urlRouterProvider.otherwise("/sign-in");
})
