This directory contains a static web page representing a single DVD logo which is moving along 3D surface and reflect on mirrored walls.

## Features:
- Logo is moving in 3D space;
- Color is changed after every hit;
- Sound is triggered after every hit;
- Responsivity

## Local deployment

- Clone repository;
- Open `dvd-logo-animation/3d-single-logo` directory;
- Run any server for serving this directory. For example, with VSCode LiveServer (see demo):
  - Open `index.html` in VSCode;
  - Click "Go Live" to execute the server;
  - Localhost should be opened automatically (e. g. http://127.0.0.1:5500/) in the browser;
- Allow sounds for opened page (Site Settings -> Sound -> Allow). Otherwise sound won't be played, 
since browsers restrict playing sound without interation with the page or explicit allowing in the settings.

## Demo

![demo](demo.gif)
