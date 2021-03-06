(function() {
  'use strict';
  /**
   * @ngdoc controller
   * @name daiictSenTeam13App.controller:ViewprofileCtrl
   * @description
   * # ViewprofileCtrl
   * Controller of the daiictSenTeam13App
   */
  angular.module('daiictSenTeam13App')
    .controller('ViewprofileCtrl', ['$scope', '$location', '$timeout', '$routeParams', '$rootScope', function($scope, $location, $timeout, $routeParams, $rootScope) {
      var ref = new Firebase('https://sfip.firebaseio.com/');
      var authData = ref.getAuth();
      var email = $routeParams.profileId;

      $rootScope.userType = sessionStorage.getItem('userType');      
      $scope.loading = true;

      if (authData) {
        console.log("Authenticated user with uid:", authData.uid);
      } else {
        $location.path('/');
      }

      function getData() {
        ref.child('profile').orderByChild('email').equalTo(email).once('value', function(dataSnapshot) {
          console.log(dataSnapshot.val());
          var temp = dataSnapshot.val();
          for (var key in temp) {
            $scope.firstName = temp[key].firstName;
            $scope.lastName = temp[key].lastName;
            $scope.type = temp[key].type;
            $scope.institute = temp[key].institute;
            $scope.about = temp[key].about;
            $scope.interests = temp[key].interests;
            $scope.publications = temp[key].publications;
            $scope.email= temp[key].email;
            $scope.location= temp[key].location;
            $scope.projects= temp[key].projects;
            break;
          }
          $timeout(function() {
            $scope.$apply();
          });
          $scope.loading = false;
        }, function(err) {
          console.error(err);
        });
      }
      getData();

      $scope.initMaterial = function() {
        $(document).ready(function() {
          $(".button-collapse").sideNav({
            closeOnClick: $(window).width() > 991 ? false : true
          });
          $('.modal-trigger').leanModal();
          $('.collapsible').collapsible({
            accordion: false
          });
        });
      };
      $scope.initMaterial();

      $scope.logout = function() {
        console.log('logout called');
        ref.unauth();
        console.log('logged out');
        $location.path('/');
      };

      $scope.goTo = function(page) {
        switch (page) {
          case 'home':
            if ($rootScope.userType === 'true') {
              $location.path('/faculty');
            } else {
              $location.path('/student');
            }
            break;
          case 'profile':
            $location.path('/profile');
            break;
          case 'chatRooms':
            if ($rootScope.userType === 'true') {
              $location.path('/createChat');
            } else {
              $location.path('/chatRooms');
            }
            break;
          case 'jobs':
            if ($rootScope.userType === 'true') {
              $location.path('/posting');
            } else {
              $location.path('/jobs');
            }
            break;
          case 'people':
            $location.path('/people');
            break;
          default:
            $location.path('/');
        }
      };
    }]);
})();
