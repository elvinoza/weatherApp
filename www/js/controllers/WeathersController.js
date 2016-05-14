app.controller('WeathersCtrl', function ($auth, $state, $scope, $rootScope, $stateParams, ApiService, ionicMaterialInk, $ionicModal, $timeout) {

    ionicMaterialInk.displayEffect();

    $scope.weathers = [];

    $scope.getUserStations = function(){
        ApiService.getUserStations($rootScope.currentUser.id).success(function(data) {
            $scope.stations = data;
        }).error(function(error) {
            //vm.error = error;
        });
    };

    $scope.getStationWeathers = function(id){
        ApiService.getStationWeathers(id).success(function(data) {
            $scope.weathers = data;
        }).error(function(error) {

        });
    };

    $scope.update = function(id){
        $scope.getStationWeathers(id);
    };

    $scope.refresh = function(id) {
        ApiService.getStationWeathers(id).success(function(data) {
                $scope.weathers = data;
        })
        .finally(function () {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $ionicModal.fromTemplateUrl('weatherDetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function(index) {
        $scope.modalData = $scope.weathers[index];
        $scope.modal.show();
        $timeout(function () {
            $scope.modal.hide();
        }, 4000);
    };

    $scope.getUserStations();
});