
// spawn an external Node process to run the edge-example.js in
const spawn = require("child_process").spawn,
      node = spawn("node.exe", ["./build/edge-example.js"], { cwd: process.cwd() }),
      $log = $("#log");

let socket;

function redirectOutput(x) {
  x.on('data', function (data) {
    $log.append(`${data.toString()}<br/>`);
  });
}

redirectOutput(node.stdout);
redirectOutput(node.stderr);

class UI extends React.Component {
  constructor() {
    super();

    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.setupSocketIOHandlers = this.setupSocketIOHandlers.bind(this);

    this.state = {
      results: []
    };
  }
  setupSocketIOHandlers() {
    socket.on("sayHelloResult", function(result) {
      let results = this.state.results;
      results.push(result);
      this.setState({
        results: results
      });
    }.bind(this));
  }
  componentDidMount() {
    let checkSocketIOInterval;
    checkSocketIOInterval = setInterval(function() {
      $.getScript("http://localhost:62375/socket.io/socket.io.js", function(data, status, jqxhr) {
         if(status === "success") {
           $log.html("");
           socket = io("http://localhost:62375");

           setTimeout(function(){
             $log.append("Socket.IO Client connection established<br/>");
           }, 1000);

           this.setupSocketIOHandlers();
           clearInterval(checkSocketIOInterval);
         } else {
           console.log(status);
         }
      }.bind(this));
    }.bind(this), 1000);
  }
  onKeyUpHandler(e) {
    if(e.key === "Enter") {
      socket.emit("sayHello", $("#nameInput").val());
    }
  }
  render() {
    return (
      <div>
        <label for="nameInput">Please enter a name: </label>
        <input id="nameInput" type="text" onKeyUp={this.onKeyUpHandler} />
        <br/>
        <br/>
        <div>{
          this.state.results.map(function(r, i) {
            return <div key={i}>{r}</div>
          })
        }</div>
      </div>
    );
  }
}

$(document).ready(function() {
  ReactDOM.render(<UI />, document.getElementById("content"));
});
