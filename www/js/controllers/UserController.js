app.controller('UserCtrl', function ($auth, $state, $scope, $rootScope, $stateParams, ApiService) {

    var vm = this;

    vm.error;

    vm.getUser = function(){
        ApiService.getUser($rootScope.currentUser.id).success(function(data) {
            $scope.user = data;
        }).error(function(error) {
            vm.error = error;
        });
    };

    vm.update = function(){
        ApiService.updateUser($scope.user).success(function(data) {
            $scope.user = data;
        }).error(function(error) {
            console.log(error);
        });
    };

    vm.getUser();
});