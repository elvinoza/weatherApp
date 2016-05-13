app.controller('AuthCtrl', function ($auth, $state, $http, $rootScope, ionicMaterialInk) {
    var vm = this;

    ionicMaterialInk.displayEffect();

    vm.login = function() {

        var credentials = {
            email: vm.email,
            password: vm.password
        }

        $auth.login(credentials).then(function() {
            return $http.get('http://185.81.167.243/api/' + 'authenticate/user');

        }, function(error) {
            console.log(error);

        }).then(function(response) {

            var user = JSON.stringify(response.data.user);

            localStorage.setItem('user', user);

            $rootScope.authenticated = true;

            $rootScope.currentUser = response.data.user;

            $state.go('app.lastData');
        });
    }

});


