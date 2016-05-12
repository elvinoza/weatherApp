app.controller('CreateStationCtrl', function ($state, $scope, $rootScope, ApiService, ionicMaterialInk, $ionicHistory) {

    ionicMaterialInk.displayEffect();

    var vm = this;

    $scope.station = {};

    $scope.create = function(){

        console.log($scope.station);
        $scope.station.user_id = $rootScope.currentUser.id;
        ApiService.createStation($scope.station).success(function(data) {
            $scope.station = data;
            $ionicHistory.goBack();
        }).error(function(error) {
            console.log(error);
        });
    }

});