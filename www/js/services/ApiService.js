(function() {

    'use strict';

    angular
        .module('starter')
        .service('ApiService', ApiService);

    function ApiService($http) {

        var baseURL = 'http://185.81.167.243/api/';

        this.getUser = function(id){
            return $http.get(baseURL + 'user/' + id);
        };

        this.updateUser = function(user){
            return $http.post(baseURL + 'user/' + user.id, user, { headers: { 'Accept': 'Application/json' }});
        };

        this.getUserStations = function(id){
            return $http.get(baseURL + 'user/stations/' + id);
        };

        this.getStation = function(id){
            return $http.get(baseURL + 'station/' + id);
        };

        this.updateStation = function(station){
            return $http.post(baseURL + 'station/', station, { headers: { 'Accept': 'Application/json' }});
        };

        this.createStation = function(station){
            return $http.post(baseURL + 'station/create', station, { headers: { 'Accept': 'Application/json' }});
        };

        this.getStationWeathers = function(id){
            return $http.get(baseURL + 'station/weathers/' + id);
        };

        this.getWeather = function(id) {
            return $http.get(baseURL + 'weather/' + id);
        };

        this.deleteStation = function(id) {
            return $http.get(baseURL + 'station/delete/' + id);
        };

        this.getUserLastStationsData = function(id)
        {
            return $http.get(baseURL + 'user/StationsLastData/' + id);
        };
    }
})();