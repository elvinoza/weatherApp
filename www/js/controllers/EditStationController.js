app.controller('EditStationCtrl', function ($state, $scope, $stateParams, $rootScope, ApiService, ionicMaterialInk, $timeout) {
    ionicMaterialInk.displayEffect();

    $scope.message = false;
    $scope.messages;

    $scope.station = {};

    $scope.getStation = function(id){
        ApiService.getStation(id).success(function(data) {
            $scope.station = data;
        }).error(function(error) {
            $scope.message = true;
            $scope.messages = error;
        });
    };

    $scope.update = function () {
        $scope.message = false;

        ApiService.updateStation($scope.station).success(function(data) {
            $scope.station = data;
            $scope.message = true;
            $scope.messages = "Station successful updated";

            $timeout(function() {
                $scope.message = false;
            }, 4000);

        }).error(function(error) {
            $scope.message = true;
            $scope.messages = error;
        });
    };

    $scope.getStation($stateParams.id);
});