# Geolocation App

Simple geolocation web app using Node.js, Firebase, and GeoFire.

The app displays the location of users on a map and updates their position in a set interval, as long as the browser tab with the app is in the foreground.

## Install Dependencies

~~~bash
npm init
npm install style-loader css-loader file-loader firebase geolocation geofire load-google-maps-api jquery --save
~~~

Downloads and saves dependencies to `node_modules/`, creates `package.json` and `package-lock.json`.

## Build

~~~bash
webpack app.js bundle.js
~~~

Creates `bundle.js`.

## Deploy

The following files are all that is needed to deploy the app to any HTTP server:

~~~
index.html
bundle.js
style.css
images/
~~~~
