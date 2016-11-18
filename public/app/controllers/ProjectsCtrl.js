app.controller('ProjectsCtrl', ['$scope', 'socket', '$window', '$timeout', function($scope, socket, $window, $timeout) {
  $scope.colors = ['#43B484', '#5A7394', '#36A2EB', '#DD4C3B', '#A77DC2', '#F2992E', '#4CB150', '#4CB150'];
  $scope.projects = [];

  $timeout( function(){ 
    socket.emit('projectsbyuser', $scope.idUser);
   }, 100);

  socket.on('loadprojects', function (res) {
    $scope.projects = res;
    $scope.$digest();
  });

  $scope.enterProject = function(i){
      $window.location.href = '/dashboard/' + $scope.projects[i]._id;
  }

  $scope.addProject = function(){
    bootbox.prompt("Project Name", function(result){ 
      if(result !== null){
        if(result.length >= 7){
          var proData = {
            name    : result,
            iduser  : $scope.idUser
          };
          socket.emit('newproject', proData);
        } else {
          bootbox.alert("The project name must be longer than 7 characters");
        }
      } 
    });
  } 

  $scope.deleteProject = function(index){
    bootbox.confirm("Are you sure?", function(result){ 
      if(result){
        var proRemove = {
          idpro  : $scope.projects[index]._id,
          iduser : $scope.idUser
        };
        socket.emit('deleteproject', proRemove);
      } 
    });
  }

  $scope.getID = function(index){
    bootbox.alert("ID: " + $scope.projects[index]._id);
  }

}]);