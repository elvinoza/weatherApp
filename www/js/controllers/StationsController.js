app.controller('StationsCtrl', function ($auth, $state, $scope, $rootScope, $stateParams, ApiService, ionicMaterialMotion) {

    var vm = this;

    vm.stations;
    vm.error;

    vm.getUserStations = function(){
        ApiService.getUserStations($rootScope.currentUser.id).success(function(data) {
            $scope.stations = data;
            console.log(vm.stations);
        }).error(function(error) {
            vm.error = error;
        });
    };

    vm.create = function(){
        $state.go('createStation');
    };

    $scope.blinds = function() {
        vm.getUserStations();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds(); // ionic.material.motion.blinds(); //ionicMaterialMotion
        }, 500);
    };

    $scope.blinds();
});