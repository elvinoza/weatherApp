app.controller('StationsCtrl', function ($auth, $state, $scope, $rootScope, $stateParams, ApiService, ionicMaterialInk) {

    var vm = this;

    vm.stations;
    vm.error;

    var fab = document.getElementById('fab');
    fab.addEventListener('click', function () {
        $state.go('app.createStation');
    });

    vm.getUserStations = function(){
        ApiService.getUserStations($rootScope.currentUser.id).success(function(data) {
            $scope.stations = data;
        }).error(function(error) {
            vm.error = error;
        });
    };

    vm.getUserStations();

    $scope.$on('ngLastRepeat.mylist',function(e) {
        ionicMaterialInk.displayEffect();
    });

    var fab = document.getElementById('fab');

    fab.addEventListener('click', function () {
        $state.go('app.createStation');
    });

});