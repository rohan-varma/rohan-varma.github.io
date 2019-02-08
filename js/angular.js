var myApp=angular.module("myApp", []);

myApp.controller("myController", function($scope){
    
    $scope.navOptions=[
        {
            name: "Home",
            link: "index.html"
        },
        
    ];
    
    $scope.getOptions=function(){
        return this.navOptions;
    };

});

myApp.directive('ngNavBar', function() {
  return {
    restrict: 'A',
    templateUrl: 'nav-bar.html'
  }
});
