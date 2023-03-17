var exec = require("child_process").exec;
const { SerialPort } = require("serialport");
var time = "Not used yet..";

var portName = process.argv[2]; // get the port name from the command line
var myPort = new SerialPort({
  path: portName,
  baudRate: 9600,
});

function start() {
  setInterval(() => {
    exec("tasklist", function (err, res, stderr) {
      var res = res.split("\n");
      data = [];
      var found = false;
      res.forEach((element) => {
        var name = element.split(" ")[0];
        if (name == "firefox.exe" && !found) {
          console.log("FIREFOOX");
          sendData("");
          found = true;
          var date = new Date;
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? "pm" : "am";
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? "0" + minutes : minutes;
          time = 'Prev: '+ hours + ":" + minutes + " " + ampm;
          
        }
      });
      if (!found) {
        sendData(time);
      }
    });
  }, 1000);
}

function sendData(s) {
  // convert the value to an ASCII string before sending it:
  myPort.write(s.toString() + "\n");
  console.log("Sending " + s + " out the serial port");
}

start();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
