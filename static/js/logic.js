function createMap(layers) {
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Initialize all of the LayerGroups we'll be using


    // Create the map with our layers
    var myMap = L.map("map-id", {
        center: [39.82, -98.57],
        zoom: 5,
        layers: [
            layers.Tornadoes,
            layers.Fires
        ]
    });

    // Add our 'lightmap' tile layer to the map
    lightmap.addTo(myMap);

    // Create an overlays object to add to the layer control
    var overlays = {
        "Tornadoes": layers.Tornadoes,
        "Fires": layers.Fires
    };

    // Create a control for our layers, add our overlay layers to it
    L.control.layers(null, overlays).addTo(myMap);


    var info = L.control({
        position: "bottomright"
    });

    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        return div;
    };

    // Add the info legend to the map
    info.addTo(myMap);

    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml3');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

};

function createMarkers(disasters) {
    var disasterType;
    var layers = {
        Tornadoes: new L.LayerGroup(),
        Fires: new L.LayerGroup()
    };

    for (var x=0; x < disasters.length; x++) {
        console.log(disasters[x])
        if (disasters[x].type === "Fire") {
            disasterType = "Fires"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else if (disasters[x].type === "Tornado") {
            disasterType = "Tornadoes"
            var newMarker = L.marker([disasters[x].lat, disasters[x].lon]);
            newMarker.addTo(layers[disasterType]);
        }
        else {
            disasterType = "Other"
        }

    }
    console.log(layers)
    createMap(layers)
};

const url = "/api/disasters"
d3.json(url).then(createMarkers);

anime.timeline({ loop: true })
    .add({
        targets: '.ml3 .letter',
        opacity: [0, 4],
        easing:

            "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 500 * (i + 1)
    }).add({
        targets: '.ml3',
        opacity: 100,
        duration: 400000,
        easing: "easeOutExpo",
        delay: 10
    });
