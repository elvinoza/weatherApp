app.controller('UserCtrl', function ($auth, $state, $scope, $rootScope, $stateParams, ApiService, $timeout) {

    $scope.message = false;
    $scope.messages;
    $scope.password = {};

    $scope.getUser = function(){
        ApiService.getUser($rootScope.currentUser.id).success(function(data) {
            $scope.user = data;
        }).error(function(error) {
            $scope.message = true;
            $scope.messages = error;
        });
    };

    $scope.update = function(){
        ApiService.updateUser($scope.user).success(function(data) {
            $scope.user = data;
            $scope.message = true;
            $scope.messages = "User Successful Updated!";

            $timeout(function() {
                $scope.message = false;
            }, 4000);
        }).error(function(error) {
            $scope.message = true;
            if (typeof(error.name) !== 'undefined'){
                $scope.messages= error.name[0];
            } else {
                $scope.messages= error.email[0];
            }
        });
    };

    $scope.changePassword = function(){
        ApiService.changePassword($scope.password).success(function(data) {
            $scope.password = data;
            $scope.message = true;
            $scope.messages = "Password Successful Changed!";

            $timeout(function() {
                $scope.message = false;
            }, 4000);
        }).error(function(error) {
            $scope.message = true;
            if (typeof(error.current_password) !== 'undefined'){
                $scope.messages= error.current_password[0];
            } else {
                $scope.messages= error.new_password[0];
            }
        });
    };

    $scope.getUser();
});