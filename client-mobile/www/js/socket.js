angular.module('Pronto.socket', [])

.factory('SocketFactory', ['$location', function ($location) {
  var socketFact = {};

  //hacky way to make this work in developer environments at specified port number
  //socketFact.host = $location.host() !== "localhost" ? $location.host() : "localhost:3000";

  socketFact.host = "10.8.4.60:3000";
  var socket = io.connect(socketFact.host);

  socketFact.connect = function (nameSpace) {
    if (!nameSpace) {
      socket = io.connect(socketFact.host, { forceNew: true });
      return io.connect(socketFact.host, { forceNew: true });
    } else {
      socket = io.connect(socketFact.host + "/" + nameSpace);
      return io.connect(socketFact.host + "/" + nameSpace);
    }
  };

  socketFact.on = function(eventName, callback) {
    socket.on(eventName, function() {
      var args = arguments;
      $rootScope.$apply(function()  {
        if(callback)  {
          callback.apply(socket, args);
        }
      });
    });
  };

  socketFact.emit = function(eventName, data, callback) {
    socket.emit(eventName, function() {
      var args = arguments;
      $rootScope.$apply(function()  {
        if(callback)  {
          callback.apply(socket, args);
        }
      });
    });
  };

  return socketFact;
}]);
