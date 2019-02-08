$(document).foundation()

// jQuery
$(document).ready(function(){
    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if(height>$("#logo_top_container").height()) {
            $("#nav_bar").addClass("sticky");
            $("#main_content").addClass("sticky_helper");
        }
        else{
            $("#nav_bar").removeClass("sticky");
            $("#main_content").removeClass("sticky_helper");
        }
    });
});


// angular
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
