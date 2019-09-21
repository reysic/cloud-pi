'use strict';


// https://github.com/Azure/azure-iot-sdk-node
const DeviceClient = require('azure-iot-device').Client;
const ConnectionString = require('azure-iot-device').ConnectionString;
const Message = require('azure-iot-device').Message;
const MqttProtocol = require('azure-iot-device-mqtt').Mqtt;

// https://www.npmjs.com/package/pi-temperature
const PiTemp = require("pi-temperature");

// Grab connectionString from input params or  process environment
var connectionString = process.argv[2] || process.env['AzureIoTHubDeviceConnectionString'];

// Create device client for communicating with Azure IoT hub
var client = DeviceClient.fromConnectionString(connectionString, MqttProtocol);

// Read in configuration in config.json
try {
  config = require('./config.json');
} catch (err) {
  console.error('Failed to load config.json:\n\t' + err.message);
  return;
}

// Create a message and send it to the IoT hub on interval (ms) from config
setInterval(function () {
  PiTemp.measure(function (err, temp) {
    if (err) {
      console.error(err);
    } else {
      var message = new Message(JSON.stringify({
        temperature: temp
      }));

      // Add a custom application property to the message
      // An IoT hub can filter on these properties without access to the message body
      message.properties.add('temperatureAlert', (temperature > 80) ? 'true' : 'false');

      console.log('Sending message: ' + message.getData());

      // Send the message
      client.sendEvent(message, function (err) {
        if (err) {
          console.error('Send error: ' + err.toString());
        } else {
          console.log('Message sent');
        }
      });
    }
  });
}, config.interval);
