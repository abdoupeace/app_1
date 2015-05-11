angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LoginCtrl', function ($scope, $location, OpenFB) {

        $scope.facebookLogin = function () {

            OpenFB.login('email,read_stream,publish_stream').then(
                function () {
                    $location.path('/app/search');
                },
                function () {
                    alert('OpenFB login failed');
                });
        };

})   
.controller('SearchCtrl',function($scope,$http, $window, $timeout,$location,$ionicLoading){

        $scope.loading = $ionicLoading.show({
            content: 'Loading ...'
        });


        var host = 'http://192.168.1.3/projects/zohir';
        var action = '/gifts/SearchPage';
        var params = [];


        $scope.get = function(){
            var url = '&&';
            for(var k in params){
                url = url + k + '=' + params[k] + '&';
            }
            //alert(url);
            if(url == ''){
                url = '&&';
            }
            $location.path("/app/giftlist/"+url);
            //todo redirect to /getgiftlist/url+url

        };
        $scope.update = function(val,key) {
            //console.log('key is : '+key);
            //console.log('val is : '+val);

            if(val == 'all'){
                val = '';
            }
            params[key] = val;
            //console.log(params);

        };

        var responsePromise = $http.post("http://192.168.1.3/projects/zohir/site/gifts/SearchPage");

        responsePromise.success(function(data, status, headers, config) {
            $scope.data = data;
            $scope.loading.hide();

        });
        responsePromise.error(function(data, status, headers, config) {
             $scope.loading.hide();
            alert("AJAX failed!");
            //console.log(data, status, headers, config);
        });



       
    })

.controller('GiftlistCtrl' , function($scope,$http,$location){

        var siteurl = 'http://192.168.1.3/projects/zohir/site/search';
        var url = $location.url();
        url = url.split('&&')[1];

        var curentpage = 1;
        var nextpage = '';

        function initScope(){

            var responsePromise = $http.post( siteurl + '?' + url + '&page=' + curentpage );

            responsePromise.success(function(data, status, headers, config) {
                $scope.data = data.data;
                $scope.current = curentpage;
                $scope.role = true;
                $scope.total = data.total;
                nextpage = data.next;

            });
            responsePromise.error(function(data, status, headers, config) {
                alert("AJAX failed!");
            });
        }
        initScope();


        $scope.next = function(){
            if(nextpage != 'non'){
                $scope.role = false;
                curentpage ++ ;
                initScope();
            }


        };

        $scope.prev = function(){
            if(curentpage > 1){
                $scope.role = false;
                curentpage -- ;
                initScope();
            }
        };

        $scope.$on('$routeChangeUpdate', initScope);
        $scope.$on('$routeChangeSuccess', initScope);

    })

.controller('GiftCtrl' ,function($scope , $http , $stateParams , $ionicLoading){
        $scope.current = 1;

        $scope.show = function() {
            $ionicLoading.show({
                content: 'Loading ...',
            });
        };
        $scope.hide = function(){
            $ionicLoading.hide();
        };
        $scope.next = function () {
            if($scope.current < $scope.data.img_length){
                $scope.current++;
            }
        };
        $scope.prev = function () {
            if($scope.current > 1){
                $scope.current--;
            }
        };
        
        
        var id = $stateParams.id;
        var siteurl = "http://192.168.1.3/projects/zohir/site/gift/";

        function initScope(){
            $scope.show();
            var responsePromise = $http.post( siteurl + id );

            responsePromise.success(function(data, status, headers, config) {
                $scope.data = data;

                console.log($scope.data);

                $scope.url = "http://192.168.1.3/projects/zohir/site/img/";

                $scope.hide();

            });
            responsePromise.error(function(data, status, headers, config) {
                $scope.hide();
                alert("AJAX failed!");
            });
        }
        initScope();
        $scope.$on('$routeChangeUpdate', initScope);
        $scope.$on('$routeChangeSuccess', initScope);
        

    })


.controller('AboutCtrl' , function () {
    
})
;
