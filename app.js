// Code: https://github.com/vbario/geogeo
// Video: http://youtu.be/fYxwRMaq6yY

// Create executable bundle.js with:
// webpack app.js bundle.js

// Serve page by local server with:
// http-server .

// Create package.json with:
// npm init

// Install depdendcies with:
// npm install style-loader css-loader file-loader firebase geolocation geofire load-google-maps-api jquery --save

// Dependencies
require("!style-loader!css-loader!./style.css");
import GeoFire from 'geofire';
var $ = require('jquery');
var firebase = require('firebase');
var geoLocation = require('geolocation');
var loadGoogleMapsAPI = require('load-google-maps-api');

// Initialize Firebase (code provided when creating new Firebase project)
var config = {
  apiKey: "AIzaSyBsQjHsao_AJxq9Ema0IfiUJqP2ZVi1A5Y",
  authDomain: "geolocation-5e76d.firebaseapp.com",
  databaseURL: "https://geolocation-5e76d.firebaseio.com",
  projectId: "geolocation-5e76d",
  storageBucket: "",
  messagingSenderId: "576242414261"
};

var FBApp = firebase.initializeApp(config);
var firebaseRefLocations = FBApp.database().ref();
var geoFireLocations = new GeoFire(firebaseRefLocations);

var geoQuery = geoFireLocations.query({ center: [0, 0], radius: 0 });

// Start app
var user = prompt("Please enter username");
loadGoogleMapsAPI({key: "AIzaSyCfCJiMpRkI_UuOVIrTSLx72uAl7HAOXiE"}).then(function(googleMaps) {
  initializeMap(googleMaps)
})


var initializeMap = function(Maps) {
  var markers = {};
  
  var placeMarker = function(user, location) {
    markers[user] ? markers[user].setMap(null) : null;
    markers[user] = new Maps.Marker({
      position: location,
      map: map,
      icon: './images/icon.png'
    })
  }

  var removeMarker = function(user) {
    markers[user].setMap(null);
  }

  var newGeoQuery = function(location, distance) {
    geoQuery = geoFireLocations.query({center: location, radius: distance});
    geoQuery.on("key_entered", (key, location, distance) => {
      placeMarker(key, {lat: location[0], lng: location[1]})
    })
    geoQuery.on("key_moved", (key, location, distance) => {
      placeMarker(key, {lat: location[0], lng: location[1]})
    })
    geoQuery.on("key_exited", (key, location, distance) => {
      removeMarker(key);
    })
  }
 
  var getCurrentPosition = function(noQuery) {
    geoLocation.getCurrentPosition((err, position) => {
      if (err) { throw err }
      geoFireLocations.set(user.toString(), [position.coords.latitude, position.coords.longitude]).then(function() {
        noQuery ? null : newGeoQuery([position.coords.latitude, position.coords.longitude], 20);
      });
    })
  }

  var mapDiv = document.getElementById('map');
  var map = new Maps.Map(mapDiv, {
    center: new Maps.LatLng(43.7437, -79.4562),
    zoom: 11
  })

  // Set this user's position every 2.5 seconds. Runs as long as the tab with
  // the app is in the foreground.
  getCurrentPosition(false);
  setInterval(() => { getCurrentPosition(true) }, 1000)

}
