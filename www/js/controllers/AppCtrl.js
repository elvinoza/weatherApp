﻿app.controller('AppCtrl', function ($scope, $state, $location, $ionicModal, $ionicPopover, $auth, $rootScope) {
    // Form data for the login modal
    $scope.loginData = {};

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    //var fab = document.getElementById('fab');
    //fab.addEventListener('click', function () {
    //    //location.href = 'https://twitter.com/satish_vr2011';
    //    window.open('https://twitter.com/satish_vr2011', '_blank');
    //});

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">Settings</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       Settings...' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.userInfo = function(){
        console.log('go to state');
        //$location.path('app/userDetails');
        $state.go('app.userDetails');
    };

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });

    $scope.logout = function() {
        $auth.logout().then(function() {
            localStorage.removeItem('user');
            $rootScope.authenticated = false;
            $rootScope.currentUser = null;
        });
        $location.path('/login');
    }
});