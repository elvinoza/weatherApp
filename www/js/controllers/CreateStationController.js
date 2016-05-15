app.controller('CreateStationCtrl', function ($state, $scope, $rootScope, ApiService, ionicMaterialInk, $ionicHistory, $timeout) {

    ionicMaterialInk.displayEffect();

    $scope.message = false;
    $scope.messages = {};
    $scope.station = {};

    $scope.create = function(){
        $scope.message = false;
        $scope.messages = {};
        $scope.station.user_id = $rootScope.currentUser.id;
        ApiService.createStation($scope.station).success(function(data) {
            $scope.station = data;
            $scope.message = true;
            $scope.messages = "Station Successful Created!";

            $timeout(function() {
                $scope.message = false;
            }, 2000);
            $ionicHistory.goBack();
        }).error(function(error) {
            $scope.message = true;
            if (typeof(error.name) !== 'undefined'){
                $scope.messages= error.name[0];
            } else if (typeof(error.location) !== 'undefined') {
                $scope.messages= error.location[0];
            } else {
                $scope.messages = error.update_time[0];
            }
        });
    };

});