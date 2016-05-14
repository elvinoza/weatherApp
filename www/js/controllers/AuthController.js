app.controller('AuthCtrl', function ($auth, $state, $scope, $http, $rootScope, ionicMaterialInk) {

    $scope.credentials = {};
    $scope.message = false;
    $scope.messages;

    ionicMaterialInk.displayEffect();

    $scope.login = function() {

        $auth.login($scope.credentials).then(function() {
            return $http.get('http://185.81.167.243/api/' + 'authenticate/user');

        }, function(error) {
            $scope.message = true;
            $scope.messages = error.data.error;

        }).then(function(response) {

            if(!angular.isUndefined(response)) {
                var user = JSON.stringify(response.data.user);

                localStorage.setItem('user', user);

                $rootScope.authenticated = true;

                $rootScope.currentUser = response.data.user;

                $state.go('app.lastData');
            }
        });
    }
});


