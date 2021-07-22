// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
    Tornadoes: new L.LayerGroup(),
    Wildfires: new L.LayerGroup()
  };
  
  // Create the map with our layers
  var myMap = L.map("map-id", {
    center: [39.82, -98.57],
    zoom:5,
    layers: [
      layers.Tornadoes,
      layers.Wildfires
    ]
  });

  // Add our 'lightmap' tile layer to the map
lightmap.addTo(myMap);

// Create an overlays object to add to the layer control
var overlays = {
  "Tornadoes": layers.Tornadoes,
  "Wildfires": layers.Wildfires
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(myMap);

var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

// Add the info legend to the map
info.addTo(myMap);

https://www.ncdc.noaa.gov/swdiws/geojson/nx3tvs/19800101:20210101