app.controller('StationsCtrl', function ($auth, $state, $scope, $rootScope, $stateParams, ApiService, ionicMaterialInk) {

    var vm = this;

    vm.stations;
    vm.error;

    var fab = document.getElementById('fab');
    fab.addEventListener('click', function () {
        $state.go('app.createStation');
    });

    $scope.getUserStations = function(){
        ApiService.getUserStations($rootScope.currentUser.id).success(function(data) {
            $scope.stations = data;
        }).error(function(error) {
            vm.error = error;
        });
    };

    $scope.getUserStations();

    $scope.$on('ngLastRepeat.mylist',function(e) {
        ionicMaterialInk.displayEffect();
    });

    var fab = document.getElementById('fab');

    fab.addEventListener('click', function () {
        $state.go('app.createStation');
    });

    $scope.refresh = function() {
        ApiService.getUserStations($rootScope.currentUser.id).success(function (data) {
                $scope.stations = data;
            })
            .finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    $scope.update = function(stationId){
        $state.go('app.editStation', { id: stationId});
    };
});