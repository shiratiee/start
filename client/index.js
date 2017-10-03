const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1Ijoic2hpcmF0aWVlIiwiYSI6ImNqOGJxZ2RhdzAwbTAyd244b3VrOGF4bDAifQ.FtSG15i8FTMv0UcYkrjnaA";

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", [-74.009, 40.705]);
marker.addTo(map);

fetch('/api')
.then((result) => {
  result.hotels.forEach((hotel) => {
    var option = document.createElement('option');
    option.append(hotel.name);
    document.getElementById('hotels-choices').append(option);
  }
  ).catch(console.error)
});
