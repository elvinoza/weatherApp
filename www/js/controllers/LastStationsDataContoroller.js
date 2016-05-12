app.controller('LastStationsDataCtrl', function ($auth, $state, $scope, $rootScope, $stateParams, ApiService, ionicMaterialMotion, $ionicModal, $timeout) {

    var vm = this;

    $scope.datas = [];

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

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function(index) {
        $scope.modalData = $scope.datas[index];
        $scope.modal.show();
        $timeout(function () {
            $scope.modal.hide();
        }, 4000);
    };

    $scope.blinds();
});