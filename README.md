## This repository contains sample application of nextjs with opentelmetry for monitoring and tracing with SigNoz as the application monitoring tool


### Install

clone the repo and hit

```
npm i
```
### Run
To start the app and send the data to SigNoz

```
npm run start:server
```
This will start the application on `http://localhost:8080`

By default the app will send the data to SigNoz hosted on localhost. You can change the endpoint in line 17 of `tracing.js` file

#### Hit the app a couple of times before actually seeing the tracing/logs on the SigNoz dashboard
