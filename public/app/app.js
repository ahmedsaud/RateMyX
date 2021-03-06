var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function ($routeProvider) {
    var routeUserChecks = {
        adminRole: {
            authenticate: function (auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function (auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/home/home',
            controller: 'MainController'
        })
        .when('/votes/create', {
            templateUrl: '/partials/votes/create-vote',
            controller: 'CreateVoteController',
            resolve: routeUserChecks.authenticated
        })
        .when('/categories/:name', {
            templateUrl: '/partials/categories/category',
            controller: 'ListByCategoryController'
        })
        .when('/votes/mine', {
            templateUrl: '/partials/votes/user-votes',
            controller: 'UserVotesController',
            resolve: routeUserChecks.authenticated
        })
        .when('/votes/random', {
            templateUrl: '/partials/votes/vote-details',
            controller: 'RandomVoteController',
            resolve: routeUserChecks.authenticated
        })
        .when('/vote/:id', {
            templateUrl: '/partials/votes/vote-details',
            controller: 'VoteDetailsController',
            resolve: routeUserChecks.authenticated
        })
        .when('/hall-of-fame', {
            templateUrl: '/partials/hall-of-fame/top-votes',
            controller: 'HallOfFameController',
            resolve: routeUserChecks.authenticated
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })
        .when('/login', {
            templateUrl: '/partials/account/login',
            controller: 'LoginController'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'ListUsersController',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/categories', {
            templateUrl: '/partials/admin/categories-list',
            controller: 'ListCategoryController',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/category/create', {
            templateUrl: '/partials/admin/create-category',
            controller: 'CreateCategoryController',
            resolve: routeUserChecks.adminRole
        })
        .otherwise({redirectTo: '/'})
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/login');
        }
    })
});