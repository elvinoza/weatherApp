app.controller('LastStationsDataCtrl', function ($auth, $state, $scope, $rootScope, $stateParams, ApiService, ionicMaterialMotion) {

    var vm = this;

    vm.getLastStationsData = function(){
        ApiService.getUserLastStationsData($rootScope.currentUser.id).success(function(data) {
            $scope.datas = data;
        }).error(function(error) {
            vm.error = error;
        });
    };

    $scope.blinds = function() {
        vm.getLastStationsData();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds();
        }, 500);
    };

    $scope.blinds();
});