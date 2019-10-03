# cloud-pi

Exploring Azure IoT, Node.js Raspberry Pi telemetry client and web app visualizer

## telemetry-client

A simple Node.js client that communicates with Azure IoT Hub, sending CPU temperature readings in from the Raspberry Pi it's running on. Reading interval is specified in `config.js` and connection string is specified as a command line argument.

## web-app-vizualizer

A Node.js web app for visualizing the temperature data sent in by clients to Azure IoT Hub, resulting in:  
  
![Temperature Graph](https://github.com/jeremy-hicks/cloud-pi/blob/master/docs/images/temp_graph.png)  
  
The web app uses a consumer group added to the built-in endpoint of the IoT hub to read received data, along with a connection string adhering to the default **service** access policy.

I deployed the web app using Azure App Service.
