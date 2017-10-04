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

//populate select fields
fetch('http://localhost:8080/api')
.then(response => response.json())
.then((result) => {
  result.hotels.forEach((hotel) => {
    const option = document.createElement('option');
    option.append(hotel.name);
    document.getElementById('hotels-choices').append(option);
  });
  result.restaurants.forEach((restaurant) => {
    const option = document.createElement('option');
    option.append(restaurant.name);
    document.getElementById('restaurants-choices').append(option);
  });
  result.activities.forEach((activity) => {
    const option = document.createElement('option');
    option.append(activity.name);
    document.getElementById('activities-choices').append(option);
  });
  })
  .catch(console.error);

  //DOM select add buttons
document.getElementById('hotels-add').addEventListener('click', function() {
  const options = document.getElementById('hotels-choices').children;
  let choice;
  for (var i = 0; i < options.length; i++) {
    if(options[i].selected) choice = options[i];
  }

  const listItem = document.createElement('li');
  listItem.append(choice.textContent);
  document.getElementById('hotels-list').appendChild(listItem);

  fetch('http://localhost:8080/api')
})


