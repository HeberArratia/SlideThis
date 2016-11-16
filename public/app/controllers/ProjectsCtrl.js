app.controller('ProjectsCtrl', ['$scope', 'socket', function($scope, socket) {
  $scope.colors = ['#43B484', '#5A7394', '#36A2EB', '#DD4C3B', '#A77DC2', '#F2992E', '#4CB150', '#4CB150'];
  $scope.projects = [];

  socket.on('loadprojects', function (res) {
    $scope.projects = res;
    $scope.$digest();
  });

  $scope.addProject = function(){
    bootbox.prompt("Project Name", function(result){ 
      console.log(result); 
    });
  } 
}]);