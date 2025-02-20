# Realtime Xpress

## Overview

Realtime Xpress is a project designed to showcase how to use Xpress to handle real-time data processing and communication.

## Getting Started

1. Install dependencies

```sh
cd realtime-xpress
npm install
```

2. Create and input your OpenAI and google API keys in: components/Conversational.js and servers/realtime_server.js

3. Start the app

```sh
npm start
```

4. In a new terminal, navigate to src/servers, run:

```sh
cd ./src/servers
node realtime_server.js
```

NOTE: Make sure you have the face server (see Xpress/face-server) running as well.
