
const edge = require("edge"),
      socket = require("socket.io")(62375);

const sayHello = edge.func({
  assemblyFile: "./SimpleLibrary.dll",
  typeName: "SimpleLibrary.HelloWorld",
  methodName: "SayHello"
});

socket.on("connection", function(s) {
  console.log("Socket.IO Server established...");
  s.on("sayHello", function(name) {
    sayHello(name, function (error, result) {
      if (error) throw error;

      s.emit("sayHelloResult", result);
    });
  });
});
