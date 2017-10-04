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
fetch('/api')
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

function makeListener(type) {

document.getElementById(`${type}-add`).addEventListener('click', function() {
  const options = document.getElementById(`${type}-choices`).children;
  let choice;
  for (var i = 0; i < options.length; i++) {
    if(options[i].selected) choice = options[i];
  }

  const listItem = document.createElement('li');
  const name = choice.textContent;
  const button = document.createElement("button");
  button.className = "remove-btn";

  listItem.append(name)
  listItem.append(button);
  button.append('x');

  document.getElementById(`${type}-list`).appendChild(listItem);
  fetch(`/api/${type}/${name}`)
  .then(response => response.json())
  .then((result) => {
    var build= buildMarker("hotels" ,result.place.location).addTo(map);
    button.onclick = function() {
      listItem.remove();
      map.removeLayer(build);
    }
  })
})
}

makeListener("hotels");
makeListener("restaurants");
makeListener("activities");

