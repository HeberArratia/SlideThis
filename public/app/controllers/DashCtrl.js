app.controller('DashCtrl', ['$scope','$filter','cfpLoadingBar', '$timeout', 'socket', function($scope, $filter, cfpLoadingBar, $timeout, socket) {
  $scope.viewBlock = true;
  cfpLoadingBar.start();
  angular.element(document).ready(function () {
    cfpLoadingBar.complete();
    $scope.viewBlock = false;
  });

  // Obtener columnas del proyecto
  $timeout( function(){ 
    socket.emit('columnsbyproject', $scope.idProject);
   }, 100);

  /*** Switch Config Window  ***/
  $scope.viewConfig = false;
    
  $scope.switchConfig = function(){
    if($scope.viewConfig){
      $scope.viewConfig = false;
    } else {
      $scope.viewConfig = true;
    }
  }

  /*** Switch Add (Edit)  ***/
  $scope.viewAdd = false;
  $scope.viewText = false;
  $scope.viewImg = false;
  $scope.viewVideo = false;
  editActual = -1;

  $scope.configColumn = function(index){
     editActual = index;
    $scope.viewAdd = true;
    if($scope.columns[index].type == 'text'){
      $scope.viewText = true;
      $scope.int1 = $scope.columns[index].t1;
      $scope.int2 = $scope.columns[index].t2;
    } else if ($scope.columns[index].type == 'image'){
      $scope.viewImg = true;
      $scope.urlimg = $scope.columns[index].url;
    } else if ($scope.columns[index].type == 'video'){
      $scope.viewVideo = true;
      $scope.urlvideo = $scope.columns[index].url;
    }
  }

  $scope.saveColumn = function(){
    if($scope.columns[editActual].type == 'text'){
      $scope.columns[editActual].t1 = $scope.int1;
      $scope.columns[editActual].t2 = $scope.int2;
    } else if ($scope.columns[editActual].type == 'image'){
      $scope.columns[editActual].url = $scope.urlimg;
    } else if ($scope.columns[editActual].type == 'video'){
      $scope.columns[editActual].url = $scope.urlvideo;
    }
    console.log('guardado');
    $scope.closeAdd();
    console.log($scope.columns);
    editActual = -1;
  }

  $scope.closeAdd = function(){
    $scope.viewText = false;
    $scope.viewImg = false;
    $scope.viewVideo = false;
    $scope.viewAdd = false;
  }
  /*** Data  ***/
  $scope.columns = [];

  socket.on('loadcolumns', function (res) {
    $scope.columns = res;
    $scope.$digest();
  });


  /*** Cantidad elementos  ***/
  cantElem = $scope.columns.length;

  /*** Añadir nueva columna ***/
  $scope.addColumn = function(t, tem) {
      if(cantElem < 5){
        if (t == 'text'){
          $scope.columns.push({
            type            : 'text',
            t1              : '',
            t2              : '',
            template        : tem
          }); 
          $scope.viewConfig = false;
        } else if(t == 'image'){
          $scope.columns.push({
            type            : 'image',
            url             :  ''
          }); 
        } else if(t == 'video'){
            $scope.columns.push({
            type            : 'video',
            url             :  ''
          }); 
        }
        cantElem++;
        update();
    } else {
      bootbox.alert("Only 5 columns max!");
    }
  }

  /*** Eliminar una columna ***/
  $scope.removeColumn = function(index) {
    if (cantElem > 1) {
      $scope.columns.splice(index, 1);
      cantElem--;
      update();
    }
  }

  /*** Configuracion movel columnas ***/
  $scope.sortableOptions = {
    axis: 'x',
    handle: '.icon-code',
    start : function(e, ui){
    },
    update: function(e, ui) {   
    },
    stop: function(){
      $scope.$digest;
      update();
    }
  };
      
  /*** Actualizar oden de las columnas ***/    
  var update = function(){
    /* Obtener nuevo orden de columnas */
    var filteredItems = $filter('filter')($scope.columns, {name: $scope.query}, false);
    $scope.columns =  filteredItems;
    console.log($scope.columns);
  }

  /*** Obtener id **/
  $scope.getId = function(){
    alert("Hola");
    bootbox.alert("123133123321");
  }
    

}]);
